import { getSetting } from "../settings.js";

export function applyContainerItemRolls(root, sheet) {
  if (!getSetting("containerItemRolls")) return;
  const rows = root.querySelectorAll(".item-row");
  if (!rows.length) return;

  rows.forEach(row => {
    const li = row.closest("li.item");
    if (!li) return;

    const uuid = li.dataset.uuid;
    if (!uuid) return;

    const img = row.querySelector(".item-image");
    if (!img || img.dataset.rollBound) return;
    img.dataset.rollBound = "true";

    img.addEventListener("click", async evt => {
      evt.preventDefault();
      evt.stopPropagation();

      const item = await fromUuid(uuid);
      if (!item) return;

      const isContainer = sheet.constructor.name === "ContainerSheet";

      if (isContainer && item.type !== "consumable") {
        return;
      }

      const live = item.activities;
      if (live?.size) {
        const activity = [...live.values()][0];
        if (activity?.use) {
          await activity.use({ event: evt });
          return;
        }
      }

      const sys = item.system?.activities;
      if (sys && Object.keys(sys).length) {
        const activity = Object.values(sys)[0];
        if (activity?.type) {
          await item.constructor.rollActivity(item, activity, { event: evt });
          return;
        }
      }

      if (typeof item.use === "function") {
        await item.use({ event: evt });
        return;
      }

      item.sheet.render(true);

    }, true);
  });
}