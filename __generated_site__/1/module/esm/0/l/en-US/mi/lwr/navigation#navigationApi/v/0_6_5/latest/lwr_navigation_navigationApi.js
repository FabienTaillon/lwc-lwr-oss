import { getNavigationHelm } from '/1/module/esm/0/l/en-US/mi/lwr%2FcontextUtils%2Fv%2F0_6_5/latest/lwr_contextUtils.js';
/**
 * Navigate programmatically.
 * The Promise used within is deliberately not returned.
 *
 * @param {HTMLElement} context - The navigation context
 * @param {object | string} loc - A route or URL for navigating
 * @param {*} options - Usually a boolean; when true the previous browser history
 *              entry should be replaced by this one
 */

export function navigate(context, pageReference, replace) {
  const api = getNavigationHelm(context);
  api.navigate(pageReference, replace);
}
/**
 * Generate a URL for the given route.
 *
 * @param {HTMLElement} context - The navigation context
 * @param {object} route - A route
 *
 * @returns {Promise<string>}
 */

export function generateUrl(context, pageReference) {
  const api = getNavigationHelm(context);
  return api.generateUrl(pageReference);
}