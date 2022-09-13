import { isIE11 } from '/1/module/esm/0/l/en-US/mi/lightning%2FutilsPrivate%23browser%2Fv%2F1_14_7-alpha/latest/lightning_utilsPrivate_browser.js';
/**
 * Does the browser display animation.
 * Always returns false for IE11 due to performance.
 */

export function hasAnimation() {
  if (isIE11) {
    return false;
  } // JEST Workaround


  if (!window.matchMedia) {
    return true;
  }

  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  return !(!mediaQuery || mediaQuery.matches);
}