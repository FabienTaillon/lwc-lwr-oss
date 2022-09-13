import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "/1/module/esm/0/l/en-US/mi/lwc%2Fv%2F2_5_8/latest/lwc.js";
import _tmpl from "/1/module/esm/0/l/en-US/mi/lightning%2Ficon%23icon.html%2Fv%2F1_14_7-alpha/latest/lightning_icon_icon_html.js";
import { classListMutation, normalizeString, isIE11 } from '/1/module/esm/0/l/en-US/mi/lightning%2FutilsPrivate%2Fv%2F1_14_7-alpha/latest/lightning_utilsPrivate.js';
import { computeSldsClass, getCategory, isValidName } from '/1/module/esm/0/l/en-US/mi/lightning%2FiconUtils%2Fv%2F1_14_7-alpha/latest/lightning_iconUtils.js';
import { normalizeVariant } from '/1/module/esm/0/l/en-US/mi/lightning%2Ficon%23util%2Fv%2F1_14_7-alpha/latest/lightning_icon_util.js';
/**
 * Represents a visual element that provides context and enhances usability.
 */

class LightningIcon extends LightningElement {
  constructor(...args) {
    super(...args);
    this._src = void 0;
    this.privateIconName = void 0;
    this._iconName = void 0;
    this._size = void 0;
    this._variant = void 0;
    this.alternativeText = void 0;
  }

  /**
   * A uri path to a custom svg sprite, including the name of the resouce,
   * for example: /assets/icons/standard-sprite/svg/test.svg#icon-heart
   * @type {string}
   */
  get src() {
    return this.privateSrc;
  }

  set src(value) {
    this.privateSrc = value; // if value is not present, then we set the state back
    // to the original iconName that was passed
    // this might happen if the user sets a custom icon, then
    // decides to revert back to SLDS by removing the src attribute

    if (!value) {
      this._iconName = this.iconName;
      this.classList.remove('slds-icon-standard-default');
    } // if isIE11 and the src is set
    // we'd like to show the 'standard:default' icon instead
    // for performance reasons.


    if (value && isIE11) {
      this.setDefault();
      return;
    }

    this._src = value;
  }
  /**
   * The Lightning Design System name of the icon.
   * Names are written in the format 'utility:down' where 'utility' is the category,
   * and 'down' is the specific icon to be displayed.
   * @type {string}
   * @required
   */


  get iconName() {
    return this.privateIconName;
  }

  set iconName(value) {
    this.privateIconName = value; // if src is set, we don't need to validate
    // iconName

    if (this.src) {
      return;
    }

    if (isValidName(value)) {
      const isAction = getCategory(value) === 'action'; // update classlist only if new iconName is different than _iconName
      // otherwise classListMutation receives class:true and class: false and removes slds class

      if (value !== this._iconName) {
        classListMutation(this.classList, {
          'slds-icon_container_circle': isAction,
          [computeSldsClass(value)]: true,
          [computeSldsClass(this._iconName)]: false
        });
      }

      this._iconName = value;
    } else {
      console.warn(`<lightning-icon> Invalid icon name ${value}`); // eslint-disable-line no-console
      // Invalid icon names should render a blank icon. Remove any
      // classes that might have been previously added.

      classListMutation(this.classList, {
        'slds-icon_container_circle': false,
        [computeSldsClass(this._iconName)]: false
      });
      this._iconName = undefined;
    }
  }
  /**
   * The size of the icon. Options include xx-small, x-small, small, medium, or large.
   * The default is medium.
   * @type {string}
   * @default medium
   */


  get size() {
    return normalizeString(this._size, {
      fallbackValue: 'medium',
      validValues: ['xx-small', 'x-small', 'small', 'medium', 'large']
    });
  }

  set size(value) {
    this._size = value;
  }
  /**
   * The variant changes the appearance of a utility icon.
   * Accepted variants include inverse, success, warning, and error.
   * Use the inverse variant to implement a white fill in utility icons on dark backgrounds.
   * @type {string}
   */


  get variant() {
    return normalizeVariant(this._variant, this._iconName);
  }

  set variant(value) {
    this._variant = value;
  }

  connectedCallback() {
    this.classList.add('slds-icon_container');
  }

  setDefault() {
    this._src = undefined;
    this._iconName = 'standard:default';
    this.classList.add('slds-icon-standard-default');
  }

}

_registerDecorators(LightningIcon, {
  publicProps: {
    alternativeText: {
      config: 0
    },
    src: {
      config: 3
    },
    iconName: {
      config: 3
    },
    size: {
      config: 3
    },
    variant: {
      config: 3
    }
  },
  fields: ["_src", "privateIconName", "_iconName", "_size", "_variant"]
});

export default _registerComponent(LightningIcon, {
  tmpl: _tmpl
});