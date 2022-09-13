import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "/1/module/esm/0/l/en-US/mi/lwc%2Fv%2F2_5_8/latest/lwc.js";
import _tmpl from "/1/module/esm/0/l/en-US/mi/lwr%2Foutlet%23outlet.html%2Fv%2F0_6_5/latest/lwr_outlet_outlet_html.js";
import { CurrentView } from '/1/module/esm/0/l/en-US/mi/lwr%2Fnavigation%2Fv%2F0_6_5/latest/lwr_navigation.js';

class Outlet extends LightningElement {
  constructor(...args) {
    super(...args);
    this.refocusOff = false;
    this.outletErrorCallback = void 0;
    this.viewName = 'default';
    this.viewCtor = undefined;
    this.previousViewCtor = undefined;
    this.hasError = false;
  }

  // Get a reference to the current view
  setView(currentView) {
    this.hasError = false;
    this.viewCtor = currentView;
    this.refocus();
  }

  renderedCallback() {
    if (this.viewCtor !== this.previousViewCtor) {
      this.previousViewCtor = this.viewCtor;
      const viewChangedEvent = new CustomEvent('viewchange', {
        detail: this.viewCtor
      });
      this.dispatchEvent(viewChangedEvent);
    }
  }

  errorCallback(e, stack) {
    // when hosted view has unhandled error thrown:
    //  - display the error slot
    //  - dispatch the "viewchange" event
    //  - call the outletErrorCallback()
    this.hasError = true;
    const viewErrorEvent = new CustomEvent('viewerror', {
      detail: {
        error: e,
        stack
      }
    });
    this.dispatchEvent(viewErrorEvent);

    if (this.outletErrorCallback) {
      this.outletErrorCallback(e, stack);
    } else {
      console.error(e);
    }
  }

  refocus() {
    // If the feature is not turned off, put the browser focus onto the dynamic content.
    // This is done after a route change for accessibility.
    if (!this.refocusOff) {
      // TODO: LightningElement template type 'ShadowRootTheGoodPart' does not contain
      // a querySelector function, neccessitating 'any'
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.template.querySelector(`div[role='region']`).focus();
    }
  }

}

_registerDecorators(Outlet, {
  publicProps: {
    refocusOff: {
      config: 0
    },
    outletErrorCallback: {
      config: 0
    },
    viewName: {
      config: 0
    }
  },
  wire: {
    setView: {
      adapter: CurrentView,
      dynamic: ["viewName"],
      method: 1,
      config: function ($cmp) {
        return {
          viewName: $cmp.viewName
        };
      }
    }
  },
  fields: ["viewCtor", "previousViewCtor", "hasError"]
});

export default _registerComponent(Outlet, {
  tmpl: _tmpl
});