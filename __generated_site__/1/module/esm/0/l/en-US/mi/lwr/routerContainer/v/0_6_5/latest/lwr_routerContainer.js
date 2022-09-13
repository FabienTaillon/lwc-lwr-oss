import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "/1/module/esm/0/l/en-US/mi/lwc%2Fv%2F2_5_8/latest/lwc.js";
import _tmpl from "/1/module/esm/0/l/en-US/mi/lwr%2FrouterContainer%23routerContainer.html%2Fv%2F0_6_5/latest/lwr_routerContainer_routerContainer_html.js";
import { createNavigationContext } from '/1/module/esm/0/l/en-US/mi/lwr%2FrouterContainer%23utils%2Fv%2F0_6_5/latest/lwr_routerContainer_utils.js';
/*
 * Provides a LWC router component. These can be nested and all report to the root router.
 */

class RouterContainer extends LightningElement {
  // Instance of the Router class for this LWC.
  constructor() {
    super();
    this.router = void 0;
    this.historyDisabled = false;
    this.currentTitle = document.title;
  }
  /**
   * Create a router attached to this component.
   */


  connectedCallback() {
    const config = {
      historyDisabled: this.historyDisabled,
      handleNavigation: this.handleNavigation.bind(this)
    };

    if (this.router) {
      // Create the router.
      this.routerApi = createNavigationContext(this, config, this.router); // Convert hook APIs into DOM events.
      // The events do not bubble and are not composed (they cannot exit this shadow DOM)
      //     They are meant to be exposed only to the owner (direct parent) of the router

      this.routerApi.addPreNavigate(this.preNavigate.bind(this)).addPostNavigate(this.postNavigate.bind(this)).addErrorNavigate(this.errorNavigate.bind(this)) // Connect the router.
      .connect();
    }
  }
  /**
   * The preNavigate hook surfaced as a cancelable CustomEvent.
   * @param {RouteChange} - the current and proposed route information
   */


  preNavigate(routeChange) {
    const event = this._createEvent('prenavigate', routeChange, true);

    this.dispatchEvent(event);
    return !event.defaultPrevented;
  }
  /**
   * The postNavigate hook surfaced as a CustomEvent.
   * @param {RoutingResult} - the resulting navigation information
   */


  postNavigate(routingResult) {
    this.dispatchEvent(this._createEvent('postnavigate', routingResult)); // If the current route definition metadata contains a title, set it as the document title

    const title = routingResult.routeDefinition.metadata && routingResult.routeDefinition.metadata.title;

    if (title) {
      this.currentTitle = title;
      document.title = title;
    } // Update the inner HTML of the aria-live region for screen readers
    // This DOM node must be touched for every route change
    // eslint-disable-next-line @typescript-eslint/no-explicit-any


    this.template.querySelector('span').innerHTML = this.currentTitle;
  }
  /**
   * The errorNavigate hook surfaced as a CustomEvent.
   * @param {MessageObject} - error, the error encountered while navigating (if applicable)
   */


  errorNavigate(error) {
    this.dispatchEvent(this._createEvent('errornavigate', error));
    return true;
  }
  /**
   * The preNavigate hook surfaced as a cancelable CustomEvent.
   * @param {object} - address: The address being navigated to
   * @param {boolean} - shouldReplace
   */


  handleNavigation(address, replace) {
    const event = this._createEvent('handlenavigation', {
      address,
      replace
    }, true);

    this.dispatchEvent(event);
    return !event.defaultPrevented;
  }
  /**
   * Disconnect the router after DOM removal.
   */


  disconnectedCallback() {
    if (this.routerApi) {
      this.routerApi.disconnect();
    }
  }

  _createEvent(name, payload, cancelable) {
    return new CustomEvent(name, {
      detail: payload,
      bubbles: false,
      composed: false,
      cancelable
    });
  }

}

_registerDecorators(RouterContainer, {
  publicProps: {
    router: {
      config: 0
    },
    historyDisabled: {
      config: 0
    }
  }
});

export default _registerComponent(RouterContainer, {
  tmpl: _tmpl
});