import { getSetting } from "../settings.js";

export function applyItemNameExpand(html) {
  if (!getSetting("itemNameExpands")) return;

  const singleExpandMode = getSetting("singleExpandMode");
  let lastExpandedRow = null;

  const nameBlocks = html.querySelectorAll(".item-name");

  nameBlocks.forEach(block => {
    block.addEventListener("click", event => {

      if (event.target.closest(".item-image")) return;

      const action = block.dataset.action;
      if (action === "activity-use") return;

      if (action === "use") {
        event.stopImmediatePropagation();
        event.preventDefault();

        const row = block.closest(".item-row");
        const expandBtn = row?.querySelector("button[data-action='toggleExpand']");
        if (!expandBtn) return;

        if (singleExpandMode && lastExpandedRow && lastExpandedRow !== row) {
          const lastBtn = lastExpandedRow.querySelector("button[data-action='toggleExpand']");
          if (lastBtn) lastBtn.click();
        }

        expandBtn.click();
        lastExpandedRow = row;
      }

    }, true);
  });
}