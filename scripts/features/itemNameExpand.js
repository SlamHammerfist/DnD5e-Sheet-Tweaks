import { getSetting } from "../settings.js";

export function applyItemNameExpand(root) {
  if (!getSetting("itemNameExpands")) return;

  const nameBlocks = root.querySelectorAll(".item-name");

  nameBlocks.forEach(block => {
    block.addEventListener("click", event => {

      if (event.target.closest(".item-image")) return;

      const action = block.dataset.action;

      const isUse = action === "use" || action === "";

      if (!isUse) return;

      event.stopImmediatePropagation();
      event.preventDefault();

      const row = block.closest(".item-row");
      const expandBtn = row?.querySelector("button[data-action='toggleExpand']");
      if (!expandBtn) return;

      expandBtn.click();

    }, true);
  });
}