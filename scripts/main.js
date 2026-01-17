import { registerSettings } from "./settings.js";
import { applyTooltipDisabling } from "./features/tooltips.js";
import { applyItemNameExpand } from "./features/itemNameExpand.js";
import { applyHeaderCollapse } from "./features/headerCollapse.js";
import { applyContainerItemRolls } from "./features/containerRolls.js";
import { applyRemoveElectrum } from "./features/removeElectrum.js";

const OPEN_SHEETS = new Set();

Hooks.once("init", () => {
  registerSettings();
});

// ✅ Sheet-only features
function applyAllFeatures(root, sheet) {
  applyTooltipDisabling(root);
  applyItemNameExpand(root);
  applyHeaderCollapse(root);
  applyRemoveElectrum(root);
}

const SHEET_HOOKS = [
  "renderCharacterActorSheet",
  "renderNPCActorSheet",
  "renderVehicleActorSheet",
  "renderEncounterActorSheet",
  "renderContainerSheet"
];

for (const hook of SHEET_HOOKS) {
  Hooks.on(hook, (sheet, html) => {
    OPEN_SHEETS.add(sheet);

    const root = html instanceof jQuery ? html[0] : html;

    applyAllFeatures(root, sheet);
    applyContainerItemRolls(root, sheet);
  });
}

Hooks.on("closeCharacterActorSheet", sheet => {
  OPEN_SHEETS.delete(sheet);
});

Hooks.on("closeSettingsConfig", () => {
  for (const sheet of OPEN_SHEETS) {
    const actor = sheet.actor;
    sheet.close();
    actor.sheet?.render(true);
  }
});