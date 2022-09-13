export { assert } from '/1/module/esm/0/l/en-US/mi/lightning%2FutilsPrivate%23assert%2Fv%2F1_14_7-alpha/latest/lightning_utilsPrivate_assert.js';
export { ARIA, ARIA_TO_CAMEL, isAriaDescriptionSupported } from '/1/module/esm/0/l/en-US/mi/lightning%2FutilsPrivate%23aria%2Fv%2F1_14_7-alpha/latest/lightning_utilsPrivate_aria.js';
export { EventEmitter } from '/1/module/esm/0/l/en-US/mi/lightning%2FutilsPrivate%23eventEmitter%2Fv%2F1_14_7-alpha/latest/lightning_utilsPrivate_eventEmitter.js';
export { toNorthAmericanPhoneNumber } from '/1/module/esm/0/l/en-US/mi/lightning%2FutilsPrivate%23phonify%2Fv%2F1_14_7-alpha/latest/lightning_utilsPrivate_phonify.js';
export * from '/1/module/esm/0/l/en-US/mi/lightning%2FutilsPrivate%23linkUtils%2Fv%2F1_14_7-alpha/latest/lightning_utilsPrivate_linkUtils.js';
export { isAbsoluteUrl, makeAbsoluteUrl } from '/1/module/esm/0/l/en-US/mi/lightning%2FutilsPrivate%23url%2Fv%2F1_14_7-alpha/latest/lightning_utilsPrivate_url.js';
export { deepCopy, arraysEqual, ArraySlice } from '/1/module/esm/0/l/en-US/mi/lightning%2FutilsPrivate%23utility%2Fv%2F1_14_7-alpha/latest/lightning_utilsPrivate_utility.js';
export { guid } from '/1/module/esm/0/l/en-US/mi/lightning%2FutilsPrivate%23guid%2Fv%2F1_14_7-alpha/latest/lightning_utilsPrivate_guid.js';
export { classListMutation } from '/1/module/esm/0/l/en-US/mi/lightning%2FutilsPrivate%23classListMutation%2Fv%2F1_14_7-alpha/latest/lightning_utilsPrivate_classListMutation.js';
export { makeEverythingExceptElementInert, restoreInertness } from '/1/module/esm/0/l/en-US/mi/lightning%2FutilsPrivate%23inert%2Fv%2F1_14_7-alpha/latest/lightning_utilsPrivate_inert.js';
export { hasAnimation } from '/1/module/esm/0/l/en-US/mi/lightning%2FutilsPrivate%23animation%2Fv%2F1_14_7-alpha/latest/lightning_utilsPrivate_animation.js';
export { normalizeBoolean, normalizeString, normalizeArray, normalizeAriaAttribute } from '/1/module/esm/0/l/en-US/mi/lightning%2FutilsPrivate%23normalize%2Fv%2F1_14_7-alpha/latest/lightning_utilsPrivate_normalize.js';
export { keyCodes, runActionOnBufferedTypedCharacters, normalizeKeyValue, isShiftMetaOrControlKey } from '/1/module/esm/0/l/en-US/mi/lightning%2FutilsPrivate%23keyboard%2Fv%2F1_14_7-alpha/latest/lightning_utilsPrivate_keyboard.js';
export { raf } from '/1/module/esm/0/l/en-US/mi/lightning%2FutilsPrivate%23scroll%2Fv%2F1_14_7-alpha/latest/lightning_utilsPrivate_scroll.js';
export { isChrome, isIE11, isSafari } from '/1/module/esm/0/l/en-US/mi/lightning%2FutilsPrivate%23browser%2Fv%2F1_14_7-alpha/latest/lightning_utilsPrivate_browser.js';
export { observePosition } from '/1/module/esm/0/l/en-US/mi/lightning%2FutilsPrivate%23observers%2Fv%2F1_14_7-alpha/latest/lightning_utilsPrivate_observers.js';
export { hasOnlyAllowedVideoIframes } from '/1/module/esm/0/l/en-US/mi/lightning%2FutilsPrivate%23videoUtils%2Fv%2F1_14_7-alpha/latest/lightning_utilsPrivate_videoUtils.js';
export { parseToFormattedLinkifiedParts, parseToFormattedParts } from '/1/module/esm/0/l/en-US/mi/lightning%2FutilsPrivate%23linkify%2Fv%2F1_14_7-alpha/latest/lightning_utilsPrivate_linkify.js';
export { isValidPageReference } from '/1/module/esm/0/l/en-US/mi/lightning%2FutilsPrivate%23pageReference%2Fv%2F1_14_7-alpha/latest/lightning_utilsPrivate_pageReference.js';
import { smartSetAttribute } from '/1/module/esm/0/l/en-US/mi/lightning%2FutilsPrivate%23smartSetAttribute%2Fv%2F1_14_7-alpha/latest/lightning_utilsPrivate_smartSetAttribute.js';
/**
 * @param {HTMLElement} element Element to act on
 * @param {Object} values values and attributes to set, if the value is
 *                        falsy it the attribute will be removed
 */

export function synchronizeAttrs(element, values) {
  if (!element) {
    return;
  }

  const attributes = Object.keys(values);
  attributes.forEach(attribute => {
    smartSetAttribute(element, attribute, values[attribute]);
  });
}
/**
 * Get the actual DOM id for an element
 * @param {HTMLElement|String} el The element to get the id for (string will just be returned)
 *
 * @returns {String} The DOM id or null
 */

export function getRealDOMId(el) {
  if (el && typeof el === 'string') {
    return el;
  } else if (el) {
    return el.getAttribute('id');
  }

  return null;
}
/**
 * Returns the active element traversing shadow roots
 * @returns {Element} Active Element inside shadow
 */

export function getShadowActiveElement() {
  let activeElement = document.activeElement;

  while (activeElement.shadowRoot && activeElement.shadowRoot.activeElement) {
    activeElement = activeElement.shadowRoot.activeElement;
  }

  return activeElement;
}
/**
 * Returns the active elements at each shadow root level
 * @returns {Array} Active Elements  at each shadow root level
 */

export function getShadowActiveElements() {
  let activeElement = document.activeElement;
  const shadowActiveElements = [];

  while (activeElement && activeElement.shadowRoot && activeElement.shadowRoot.activeElement) {
    shadowActiveElements.push(activeElement);
    activeElement = activeElement.shadowRoot.activeElement;
  }

  if (activeElement) {
    shadowActiveElements.push(activeElement);
  }

  return shadowActiveElements;
}
export function isRTL() {
  return document.dir === 'rtl';
}
export function isUndefinedOrNull(value) {
  return value === null || value === undefined;
}
export function isNotUndefinedOrNull(value) {
  return !isUndefinedOrNull(value);
}
const DEFAULT_MODAL_ZINDEX = 9000;
const DEFAULT_ZINDEX_OFFSET = 100;
const DEFAULT_ZINDEX_BASELINE = DEFAULT_MODAL_ZINDEX + DEFAULT_ZINDEX_OFFSET;
/**
 * Returns the zIndex baseline from slds zIndex variable --lwc-zIndexModal.
 * @returns {Number} zIndex baseline
 */

export function getZIndexBaseline() {
  // When SLDS styles are present, typically on Core
  // this currently resolves to: '9000' (string)
  const modalZindexValueLwc = (window.getComputedStyle(document.documentElement) || document.documentElement.style).getPropertyValue('--lwc-zIndexModal');
  const baseZindexModalLwc = parseInt(modalZindexValueLwc, 10);
  return isNaN(baseZindexModalLwc) ? DEFAULT_ZINDEX_BASELINE : baseZindexModalLwc + DEFAULT_ZINDEX_OFFSET;
}
export function timeout(interval) {
  return new Promise(resolve => {
    // eslint-disable-next-line @lwc/lwc/no-async-operation
    setTimeout(resolve, interval);
  });
}
export function animationFrame() {
  return new Promise(resolve => {
    // eslint-disable-next-line @lwc/lwc/no-async-operation
    window.requestAnimationFrame(resolve);
  });
}
/**
 *
 * Decorates an input element to fire an "input"
 * event when the value is directly set.
 *
 * @param {HTMLElement} element The element to decorate.
 *
 */

export function decorateInputForDragon(element) {
  const valuePropertyDescriptor = getInputValuePropertyDescriptor(element);
  Object.defineProperty(element, 'value', {
    set(value) {
      valuePropertyDescriptor.set.call(this, value);
      this.dispatchEvent(new CustomEvent('input'));
    },

    get: valuePropertyDescriptor.get,
    enumerable: true,
    configurable: true
  });
}

function getInputValuePropertyDescriptor(element) {
  return Object.getOwnPropertyDescriptor(Object.getPrototypeOf(element), 'value');
}

export function setDecoratedDragonInputValueWithoutEvent(element, value) {
  const valuePropertyDescriptor = getInputValuePropertyDescriptor(element);
  return valuePropertyDescriptor.set.call(element, value);
}
/**
 * Escape HTML string
 * @param {String} html An html string
 * @returns {String} The escaped html string
 */

export function escapeHTML(html) {
  return html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}
export const BUTTON_GROUP_ORDER = {
  FIRST: 'first',
  MIDDLE: 'middle',
  LAST: 'last',
  ONLY: 'only'
};
/**
 * returns the SLDS class for the given group order
 * @param groupOrder
 * @returns {string}
 */

export function buttonGroupOrderClass(groupOrder) {
  return {
    [BUTTON_GROUP_ORDER.FIRST]: 'slds-button_first',
    [BUTTON_GROUP_ORDER.MIDDLE]: 'slds-button_middle',
    [BUTTON_GROUP_ORDER.LAST]: 'slds-button_last',
    [BUTTON_GROUP_ORDER.ONLY]: 'single-button'
  }[groupOrder];
}
/**
 * Checks if the given component is native
 * @param {Object} cmp Component instance
 * @returns {Boolean} Whether the component is native
 */

export function isNativeComponent(cmp) {
  if (cmp && cmp.template && cmp.template.constructor) {
    return !!String(cmp.template.constructor).match(/\[native code\]/);
  }

  return false;
}