import { getSetting } from "../settings.js";

export function applyTooltipDisabling(root) {
  if (!getSetting("disableItemTooltips")) return;

  root.querySelectorAll("[data-tooltip]").forEach(el => {
    el.removeAttribute("data-tooltip");
  });
}