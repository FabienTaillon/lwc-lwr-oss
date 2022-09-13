/* All Valid Aria Attributes, in camel case
 * - it's better to start from camel-case
 *   because `aria-${_.kebabCase('describedBy')}` => 'aria-described-by' (NOT aria property)
 * - correct aria property: 'aria-describedby'
 *  https://www.w3.org/TR/wai-aria/
 */
const ARIA_PROP_LIST = ['activeDescendant', 'atomic', 'autoComplete', 'busy', 'checked', 'colCount', 'colIndex', 'colSpan', 'controls', 'current', 'describedAt', 'describedBy', 'description', 'details', 'disabled', 'dropEffect', 'errorMessage', 'expanded', 'flowTo', 'grabbed', 'hasPopup', 'hidden', 'invalid', 'keyShortcuts', 'label', 'labelledBy', 'level', 'live', 'modal', 'multiLine', 'multiSelectable', 'orientation', 'owns', 'placeholder', 'posInSet', 'pressed', 'readOnly', 'relevant', 'required', 'roleDescription', 'rowCount', 'rowIndex', 'rowSpan', 'selected', 'setSize', 'sort', 'valueMax', 'valueMin', 'valueNow', 'valueText'];
/**
 * Generate an ARIA lookup object when passing in a list of ARIA values
 * @param {Array} list A list of ARIA properties (array of strings)
 * @param {String} type A type which defaults to output ARIA properties as modified kebab-case, or camel-case
 * @example 'valueMax' string becomes: { VALUEMAX: 'aria-valuemax' }
 * @returns {Object} A lookup object for ARIA properties in (modified) kebab-case or camel-case
 */

const getAriaLookup = (list, type = 'default') => {
  if (!list || list.length === 0) {
    throw new Error('List of aria properties is required');
  }

  const lookupObj = {};

  if (type === 'default') {
    list.forEach(name => {
      const nameUpperCase = name.toUpperCase();

      if (!lookupObj[nameUpperCase]) {
        lookupObj[nameUpperCase] = `aria-${name.toLowerCase()}`;
      }
    });
    return lookupObj;
  }

  list.forEach(name => {
    const ariaPropertyLowerCase = `aria-${name.toLowerCase()}`;
    const ariaPropertyCamelCase = `aria${name.charAt(0).toUpperCase()}${name.slice(1)}`;

    if (!lookupObj[ariaPropertyLowerCase]) {
      lookupObj[ariaPropertyLowerCase] = ariaPropertyCamelCase;
    }
  });
  return lookupObj;
};
/**
 * ARIA lookup, 'modified' kebab-case
 * Given an array of aria property strings in camel-case, produce a lookup object
 * NOTE: 'ariaDescribedBy' (camel-case ARIA property) in TRUE kebab-case would be:
 * - 'aria-described-by' (not valid ARIA)
 * - 'aria-describedby' (valid ARIA, or modified kebab-case)
 * Example: 'describedBy' -> { DESCRIBEDBY: 'aria-describedby' }
 */


export const ARIA = getAriaLookup(ARIA_PROP_LIST);
/**
 * ARIA lookup, aria-property (key): 'ariaCamelCase' (value)
 * Example: 'valueMax' -> { 'aria-valuemax': 'ariaValueMax' }
 * Useful for converting from normal aria properties to aria camel cased values
 */

export const ARIA_TO_CAMEL = getAriaLookup(ARIA_PROP_LIST, 'cc');
/**
 * Set either 'aria-describedby' or 'aria-description' value for accessibility
 * based on the presence of 'description' api value and support of the newer ARIA
 * 'aria-description'.  At launch, Firefox, Safari do not support it (and IE11 never will).
 * https://caniuse.com/mdn-api_element_ariadescription
 * @private
 * @returns {boolean} true indicates aria-description is supported; false, no support
 */
// cached value, so check once and only once

let ariaDescriptionSupported = null;
export function isAriaDescriptionSupported() {
  // return previously cached value, don't recheck
  if (ariaDescriptionSupported !== null) {
    return ariaDescriptionSupported;
  } // if not previously set, test for browser support


  const testVal = 'test ability to set';
  const span = document.createElement('span');

  try {
    span.ariaDescription = testVal;
    const ariaDescVal = span.getAttribute(ARIA.DESCRIPTION);
    ariaDescriptionSupported = testVal === ariaDescVal;
  } catch (e) {
    ariaDescriptionSupported = false;
  }

  return ariaDescriptionSupported;
}