import { getCategory } from '/1/module/esm/0/l/en-US/mi/lightning%2FiconUtils%2Fv%2F1_14_7-alpha/latest/lightning_iconUtils.js';
import { normalizeString } from '/1/module/esm/0/l/en-US/mi/lightning%2FutilsPrivate%2Fv%2F1_14_7-alpha/latest/lightning_utilsPrivate.js';
export function normalizeVariant(variant, iconName) {
  // Unfortunately, the `bare` variant was implemented to do what the
  // `inverse` variant should have done. Keep this logic for as long as
  // we support the `bare` variant.
  if (variant === 'bare') {
    // TODO: Deprecation warning using strippable assertion
    variant = 'inverse';
  }

  if (getCategory(iconName) === 'utility') {
    return normalizeString(variant, {
      fallbackValue: '',
      validValues: ['error', 'inverse', 'warning', 'success']
    });
  }

  return 'inverse';
}