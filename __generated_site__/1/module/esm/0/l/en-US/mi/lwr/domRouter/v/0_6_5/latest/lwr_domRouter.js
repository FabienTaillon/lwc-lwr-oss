import { registerDecorators as _registerDecorators } from "/1/module/esm/0/l/en-US/mi/lwc%2Fv%2F2_5_8/latest/lwc.js";

/**
 * Copyright (c) 2019, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
import { CurrentPageReference, CurrentRoute, CurrentView, NavigationContext, registerNavigationHelm } from '/1/module/esm/0/l/en-US/mi/lwr%2Fnavigation%2Fv%2F0_6_5/latest/lwr_navigation.js';
import { currentPageReferenceContextualizer, currentRouteContextualizer, currentViewContextualizer, navigationContextContextualizer, provideContext } from '/1/module/esm/0/l/en-US/mi/lwr%2FcontextProvider%2Fv%2F0_6_5/latest/lwr_contextProvider.js';
import { generateMessageObject, invariant, messages } from '/1/module/esm/0/l/en-US/mi/lwr%2FrouterErrors%2Fv%2F0_6_5/latest/lwr_routerErrors.js';
import { createFilterChain, guid } from '/1/module/esm/0/l/en-US/mi/lwr%2FrouterUtils%2Fv%2F0_6_5/latest/lwr_routerUtils.js';
import { createObservable } from '/1/module/esm/0/l/en-US/mi/lwr%2Fobservable%2Fv%2F0_6_5/latest/lwr_observable.js';
import { CONTEXT_ID_BACKDOOR } from '/1/module/esm/0/l/en-US/mi/lwr%2FnavigationMixinHacks%2Fv%2F0_6_5/latest/lwr_navigationMixinHacks.js'; // Event fired when a component calls navigate()

export const NAV_EVENT = `universalcontainernavigationevent${guid()}`; // Event fired to find nearest parent

export const PARENT_EVENT = `universalcontainerparentevent${guid()}`;
export class DomRouterImpl {
  /**
   * Create and configure the Router.
   *
   * @param {object} config - The domRouter config object, all properties are optional
   * @param {object} router - an optional Router
   * @param {HTMLElement} target - DOM node to attach to
   */
  constructor(config, router, target) {
    this.pendingRoute = null;
    this.committedRoute = null;
    this.contextId = Object.freeze(() => undefined);
    this.connected = false;
    this.preNavFilters = createFilterChain();
    this.errorNavFilters = createFilterChain();

    this._handleNavigationEvent = event => {
      const navigationEvent = event;

      if (navigationEvent.detail && typeof navigationEvent.detail === 'object') {
        const {
          url,
          replace,
          address
        } = navigationEvent.detail;
        const continueNavigation = this.config.handleNavigation(address, replace);

        if (!continueNavigation) {
          navigationEvent.stopPropagation();
        } else {
          if (this.root && !url) {
            // handle navigation can avoid the error message if it indicates navigation
            // shouldn't continue, even if url is missing
            this.root.processError(generateMessageObject(messages.MISSING_URL, [JSON.stringify(address)]));
          } else if (!this.parent) {
            this.process(url, replace);
          }
        }
      }
    };

    this._handleParentEvent = event => {
      event.stopImmediatePropagation();
      const parentRouterEvent = event;

      if (parentRouterEvent && parentRouterEvent.detail && typeof parentRouterEvent.detail === 'function') {
        parentRouterEvent.detail(this);
      }
    };

    this.config = {
      handleNavigation: config.handleNavigation || (() => true)
    };
    this.target = target || window;
    this.router = router;
    this.routeObservable = createObservable();
  }
  /**
   * Search up the node chain until the root node is hit
   */


  get root() {
    if (!this.parent) {
      return this;
    }

    let maybe = this.parent;

    while (maybe) {
      if (!maybe.parent) {
        return maybe;
      }

      maybe = maybe.parent;
    }

    throw new Error('No root router could be found');
  }
  /**
   * Informs an wire listeners of routing changes/errors
   *
   * @param {RoutingResult} result - result object from navigation event
   * @param {string} url - url from the page reference that triggered the navigation event
   * @param {MessageObject} error - if an error occurred during the navigation
   */


  updateWires(result, url, error) {
    if (error) {
      this.processError(error);
    } else {
      // This code block is called whenever CurrentView.update() executes successfully.
      // CurrentView.update() is called:
      //      - Whenever a component with @wire(CurrentView) is mounted
      //      - Every time a nav event fires for EACH component with @wire(CurrentView)
      // meaning every time a nav event fires, this function may be called several times.
      // Since this function is post-processing for a nav event,
      //      it should ONLY run ONCE for each unique nav event.
      // By doing a STRICT comparison between the incoming route and the committed route OBJECTS,
      //      it can be determined if the nav event is new or has already been post-processed.
      if (this.committedRoute && result.route === this.committedRoute.route) {
        // This nav event has already been processed, DO NOT do it again #957
        return;
      } // if there's no pending route (the router was called to navigate independently of the DomRouter)
      // then provide the result page reference -> url as the default


      this.pendingRoute = this.pendingRoute || { ...result,
        url
      };
      this.committedRoute = { ...this.pendingRoute,
        ...result
      };
      CurrentPageReference.setContext(this.target, result.route.pageReference);
      CurrentRoute.setContext(this.target, this.committedRoute.route);
      this.routeObservable.next({ ...this.committedRoute,
        viewset: result.viewset
      }); // kick off child node processing (if necessary)

      if (this.child) {
        this.child.process(this._stripUrlForChild(this.committedRoute.url));
      }
    }
  }
  /**
   * Override to provide this router as a navigation context
   */


  connect() {
    // connect this node as a child to its closest ancestor
    this._sendEvent(PARENT_EVENT, router => {
      this.parent = router;
      router.addChild(this);
    });

    const contextApi = {
      navigate: (address, replace) => this.navigate(address, replace),
      generateUrl: address => this.generateUrl(address),
      subscribe: (callback, replay) => this.subscribe(callback, replay)
    };
    registerNavigationHelm(this.contextId, contextApi); // have this router provide context to child wire users

    provideContext(this.contextId, this.target, navigationContextContextualizer, NavigationContext);
    provideContext(undefined, this.target, currentPageReferenceContextualizer, CurrentPageReference);
    provideContext(undefined, this.target, currentRouteContextualizer, CurrentRoute);
    provideContext(undefined, this.target, currentViewContextualizer, CurrentView);
    this.router.subscribe(result => {
      const pageReference = result.route.pageReference || {};
      const url = this.router.generateUrl(pageReference) || '';

      if (result.viewset) {
        // If result includes a viewset, wait to emit pageReference until the view is resolved.
        // If the previous view subscribed to the pageReference wire, it may visibly update before outlet
        // has rendered the incoming view. (W-8459372)
        const currentViewContext = {
          viewset: result.viewset,
          onComplete: this.updateWires.bind(this, result, url)
        };
        CurrentView.setContext(this.target, currentViewContext);
      } else if (result.route.pageReference) {
        this.updateWires(result, url);
      }
    }, true); // add listener for navigation and parent events

    this.target.addEventListener(NAV_EVENT, this._handleNavigationEvent);
    this.target.addEventListener(PARENT_EVENT, this._handleParentEvent); // Only used by NavigationMixin, which can't use `@wire` because it's part of the navigation API, and can't import anything from lwc.

    this.target.addEventListener(CONTEXT_ID_BACKDOOR, event => {
      const navCtxEvent = event;

      if (navCtxEvent.detail.callback) {
        navCtxEvent.detail.callback(this.contextId);
      }
    });
    this.connected = true;
  }

  disconnect() {
    // remove event listeners
    this.target.removeEventListener(NAV_EVENT, this._handleNavigationEvent);
    this.target.removeEventListener(PARENT_EVENT, this._handleParentEvent); // detach from parent

    if (this.parent) {
      this.parent.child = undefined;
    }

    this.parent = undefined; // detach from child

    if (this.child) {
      this.child.parent = undefined;
    }

    this.child = undefined;
    this.connected = false;
  }
  /**
   * Add listeners to this router hook which run BEFORE a new URL is processed (root -> leaf).
   *
   * @param {object | object[]} filters
   */


  addPreNavigate(filters) {
    this.preNavFilters.add(filters);
  }
  /**
   * Add listeners to this router hook which run when there is an error navigating.
   *
   * @param {object | object[]} filters
   */


  addErrorNavigate(filters) {
    this.errorNavFilters.add(filters);
  }
  /**
   * Override parent implementation.
   * Pass the current state down to a new child.
   *
   * @param {child} child - Child router
   */


  async addChild(child) {
    await new Promise(resolve => {
      // Temp fix for https://github.com/salesforce/lwc/issues/1894

      /* eslint-disable-next-line */
      setTimeout(() => {
        invariant(!this.child, messages.MULTIPLE_CHILDREN);
        this.child = child;
        resolve();
      }, 0);
    });

    if (this.child && this.committedRoute) {
      const url = this._stripUrlForChild(this.committedRoute.url);

      const canContinue = await this.child.preProcess(url);

      if (canContinue) {
        this.child.process(url);
      }
    }
  }
  /**
   * Process the current URL passed down by the parent router.
   * Stop propagation of the navigation event if a preNavigate filter returns false.
   *
   * Update the current path and route matches.
   * Update the observable to hold the new route.
   *
   * After processing, delegate to a child router, if it exists.
   *
   * @param {string} url - Relative URL string to process
   * @returns {boolean} - True if the processing was NOT blocked by a preNavigate listener
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars


  async process(url, replace) {
    // Run the root -> leaf chain of pre navigate filters, if this is the root.
    try {
      if (!this.parent) {
        await this.preProcess(url);
      }
    } catch (e) {
      if (e.code) {
        this.processError(e);
        return false;
      }

      throw e;
    } // If there is a child, it will be subscribed to the router's navigate() output which will
    // trigger the child to navigate afterwards


    const address = this.router.parseUrl(url);

    if (address) {
      this.router.navigate(address);
    }

    return true;
  }
  /**
   * Run the preNavigate filters for this router.
   * After processing, delegate to a child router, if it exists.
   *
   * @param {string} url - Relative URL string to process,
   *                   cannot use a route since the processing is done in context
   *
   * @returns {Promise<boolean>} - Resolves to true if successful
   */


  preProcess(url) {
    const address = this.router.parseUrl(url);
    const routingMatch = address && this.router.matchRoute(address); // Check that the URL has a matching route, otherwise it is an error.

    if (!routingMatch) {
      return Promise.reject(generateMessageObject(messages.MISSING_ROUTE, [url]));
    }

    this.pendingRoute = {
      url,
      ...routingMatch
    }; // Compile this router's filters; continue with TRUE if there are no filters.

    const canGo = this.preNavFilters.empty() ? Promise.resolve(true) : this.preNavFilters.compile({
      current: this.committedRoute || undefined,
      next: this.pendingRoute
    }); // If the filters pass, run its child's filters.

    return canGo.then(canContinue => {
      return canContinue && this.child ? this.child.preProcess(this._stripUrlForChild(url)) : canContinue;
    }) // Craft an error message, if the filters have returned false.
    .then(canContinue => {
      return canContinue || Promise.reject(generateMessageObject(messages.PRENAV_FAILED, [url]));
    });
  }
  /**
   * Run the errorNavigate filters for this router.
   * After processing, delegate to a child router, if it exists.
   *
   * @param {object} e - An error object to pass into the error hook listeners.
   */


  processError(messageObject) {
    this.errorNavFilters.compile(messageObject);

    if (this.child) {
      this.child.processError(messageObject);
    }
  }
  /**
   * lightning/navigation
   * Fire an event to send the navigation event up the DOM.
   * The root router will be the last to catch the event if it is not stopped.
   *
   * @param {object} address - Address to navigate to
   * @param {*} options - Usually a boolean; when true the previous browser history
   *                    entry should be replaced by this one
   */


  navigate(address, replace) {
    // Ensure there is a string URL to pass to the navigation event.
    let url = this.router.generateUrl(address);

    if (url) {
      // If this router is a child, we need to prepend the parent's matching portion
      // of the url before sending the navigate event up
      const parentPath = this.parent && this.parent.committedRoute && this.parent.committedRoute.pathMatch || '';
      url = parentPath.concat(url);
    } // Fire event up the DOM with the original caller input


    this._sendEvent(NAV_EVENT, {
      url,
      replace,
      address
    });
  }
  /**
   * lightning/navigation
   * Generate a URL based on the given route.
   * Return a Promise containing the URL string.
   *
   * @param   {object} route - Route to generate a url for
   *
   * @returns {Promise<string>}
   */


  generateUrl(address) {
    const url = this.router.generateUrl(address); // Invalid addresses need to return null to indicate they are invalid

    if (!url) {
      return null;
    } // If this router is a child, we need to prepend the parent's matching portion
    // of the url to generate the complete url


    const parentPath = this.parent && this.parent.committedRoute && this.parent.committedRoute.pathMatch || '';
    return `${parentPath}${url}`;
  }
  /**
   * lightning/navigation
   * Subscribe a callback to the Observable on the current route of this router.
   *
   * @param {function} callback - A callback function invoked when the navigation state changes
   *                     callback(route, routeDef)
   * @param {boolean} replay - Flag to determine if callback should be called with current route and data immediately
   */


  subscribe(callback, replay) {
    return this.routeObservable.subscribe({
      next: callback,
      error: () => {// ignore
      },
      complete: () => {// nothing to clean up
      }
    }, Boolean(replay));
  }
  /**
   * Inspect a navigation event bubbling up from a descendent component.
   * This node can choose to stop the event by returning false.
   * If propagation is not stopped, and this node is the root (no parent),
   *      then begin the root -> leaf processing of this new route.
   *      This will update the navigation event subscribers in each DomRouter, top down.
   *
   * @param {Event} event - With detail: { url, options }
   */


  _sendEvent(name, payload) {
    this.target.dispatchEvent(new CustomEvent(name, {
      bubbles: true,
      composed: true,
      detail: payload
    }));
  }

  _stripUrlForChild(url) {
    if (this.pendingRoute && url.indexOf(this.pendingRoute.pathMatch) === 0) {
      return url.replace(this.pendingRoute.pathMatch, '');
    }

    return url;
  }

}
/**
 * Create a new root Router, attach to the Window.
 * This is the public, programmatic API for root router creation.
 * An application can only have ONE root router.
 *
 * @param {object} config - The router config object
 *
 * @returns {object} - { addPreNavigate, addErrorNavigate, connect, disconnect }
 */

_registerDecorators(DomRouterImpl, {
  fields: ["pendingRoute", "committedRoute", "contextId", "connected", "preNavFilters", "errorNavFilters", "_handleNavigationEvent", "_handleParentEvent"]
});

export function createDomRouter(config, router, target) {
  return new DomRouterImpl(config, router, target);
}