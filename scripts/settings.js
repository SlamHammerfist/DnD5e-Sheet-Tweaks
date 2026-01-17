export const MODULE_ID = "dnd-sheet-tweaks";

export function registerSettings() {

  game.settings.register(MODULE_ID, "disableItemTooltips", {
    name: "Disable Item Tooltips",
    hint: "Removes the DnD5e hover tooltips from items on character sheets.",
    scope: "client",
    config: true,
    type: Boolean,
    default: false
  });

  game.settings.register(MODULE_ID, "itemNameExpands", {
    name: "Item Name Expands",
    hint: "Clicking an item name expands or collapses its details directly on the sheet.",
    scope: "client",
    config: true,
    type: Boolean,
    default: true
  });

  game.settings.register(MODULE_ID, "removeElectrum", {
    name: "Remove Electrum",
    hint: "Hides electrum currency from character sheets.",
    scope: "world",
    config: true,
    type: Boolean,
    default: true
  });

  game.settings.register(MODULE_ID, "containerItemRolls", {
    name: "Container Item Rolls",
    hint: "Enables rolling consumable items directly from container sheets.",
    scope: "client",
    config: true,
    type: Boolean,
    default: true
  });

  game.settings.register(MODULE_ID, "headerCollapse", {
    name: "Header Collapse",
    hint: "Adds collapse/expand toggles to item section headers.",
    scope: "client",
    config: true,
    type: Boolean,
    default: true
  });

}

export function getSetting(key) {
  return game.settings.get(MODULE_ID, key);
}