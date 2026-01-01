export const MODULE_ID = "dnd-sheet-tweaks";

export function registerSettings() {
  game.settings.register(MODULE_ID, "disableItemTooltips", {
    name: "Disable Item Tooltips",
    scope: "client",
    config: true,
    type: Boolean,
    default: false
  });

  game.settings.register(MODULE_ID, "itemNameExpands", {
    name: "Item Name Expands",
    scope: "client",
    config: true,
    type: Boolean,
    default: true
  });

  game.settings.register(MODULE_ID, "singleExpandMode", {
    name: "Single Expand Mode",
    scope: "client",
    config: true,
    type: Boolean,
    default: false
  });
}

export function getSetting(key) {
  return game.settings.get(MODULE_ID, key);
}