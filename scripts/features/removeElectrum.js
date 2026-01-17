import { getSetting } from "../settings.js";

export function applyRemoveElectrum(root) {
  if (!getSetting("removeElectrum")) return;

  root.querySelectorAll('label').forEach(label => {
    const icon = label.querySelector('.currency.ep');
    if (icon) label.remove();
  });

  root.querySelectorAll("dnd5e-currency").forEach(el => {
    const epLabel = el.shadowRoot?.querySelector('label:has(.currency.ep)');
    if (epLabel) epLabel.remove();
  });
}