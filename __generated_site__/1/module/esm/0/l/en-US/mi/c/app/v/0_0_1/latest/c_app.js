import { load } from "/1/module/esm/0/l/en-US/mi/lwr%2FesmLoader%2Fv%2F0_6_5/latest/lwr_esmLoader.js";
import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "/1/module/esm/0/l/en-US/mi/lwc%2Fv%2F2_5_8/latest/lwc.js";
import _tmpl from "/1/module/esm/0/l/en-US/mi/c%2Fapp%23app.html%2Fv%2F0_0_1/latest/c_app_app_html.js";
import { createRouter } from '/1/module/esm/0/l/en-US/mi/lwr%2Frouter%2Fv%2F0_6_5/latest/lwr_router.js'; // Route definition array

const routes = [{
  id: 'home',
  uri: '/',
  handler: () => load('c/homePageHandler/v/0_0_1'),
  page: {
    type: 'home'
  }
}, {
  id: 'namedPage',
  uri: '/:pageName',
  handler: () => load('c/namedPageHandler/v/0_0_1'),
  page: {
    type: 'namedPage',
    attributes: {
      pageName: ':pageName'
    }
  }
}];

class HelloWorldApp extends LightningElement {
  constructor(...args) {
    super(...args);
    this.router = createRouter({
      routes
    });
  }

}

_registerDecorators(HelloWorldApp, {
  fields: ["router"]
});

export default _registerComponent(HelloWorldApp, {
  tmpl: _tmpl
});