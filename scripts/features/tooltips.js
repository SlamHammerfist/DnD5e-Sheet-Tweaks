import { getSetting } from "../settings.js";

export function applyTooltipDisabling(html) {
  if (!getSetting("disableItemTooltips")) return;

  html.querySelectorAll(".item-row [data-tooltip]").forEach(el => {
    el.removeAttribute("data-tooltip");
    el.removeAttribute("data-tooltip-class");
  });
}