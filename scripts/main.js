import { registerSettings } from "./settings.js";
import { applyTooltipDisabling } from "./features/tooltips.js";
import { applyItemNameExpand } from "./features/itemNameExpand.js";
import { applyHeaderCollapse } from "./features/headerCollapse.js";

const OPEN_SHEETS = new Set();

Hooks.once("init", () => {

  registerSettings();
});

Hooks.on("renderCharacterActorSheet", (sheet, html) => {
  OPEN_SHEETS.add(sheet);

  const root = sheet.form;

  requestAnimationFrame(() => {
    applyLayoutTransform(root);

    sheet._tabs?.primary?.bind(root);
  });

  applyTooltipDisabling(html);
  applyItemNameExpand(html);
  applyHeaderCollapse(html);
});

Hooks.on("closeCharacterActorSheet", (sheet) => {
  OPEN_SHEETS.delete(sheet);
});

Hooks.on("closeSettingsConfig", () => {
  for (const sheet of OPEN_SHEETS) {
    const actor = sheet.actor;
    sheet.close();
    actor.sheet?.render(true);
  }
});