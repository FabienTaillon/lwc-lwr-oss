import _implicitStylesheets from "/1/module/esm/0/l/en-US/mi/c%2Fapp%23app.css%2Fv%2F0_0_1/latest/c_app_app_css.js";

import _implicitScopedStylesheets from "/1/module/esm/0/l/en-US/mi/c%2Fapp%23app.scoped.css%3Fscoped%3Dtrue%2Fv%2F0_0_1/latest/c_app_app_scoped_css_scoped=true.js";

import _cHeader from "/1/module/esm/0/l/en-US/mi/c%2Fheader%2Fv%2F0_0_1/latest/c_header.js";
import _lwrOutlet from "/1/module/esm/0/l/en-US/mi/lwr%2Foutlet%2Fv%2F0_6_5/latest/lwr_outlet.js";
import _lwrRouterContainer from "/1/module/esm/0/l/en-US/mi/lwr%2FrouterContainer%2Fv%2F0_6_5/latest/lwr_routerContainer.js";
import {registerTemplate} from "/1/module/esm/0/l/en-US/mi/lwc%2Fv%2F2_5_8/latest/lwc.js";
function tmpl($api, $cmp, $slotset, $ctx) {
  const {c: api_custom_element, t: api_text, h: api_element} = $api;
  return [api_element("main", {
    key: 0
  }, [api_custom_element("c-header", _cHeader, {
    key: 1
  }, []), api_custom_element("lwr-router-container", _lwrRouterContainer, {
    props: {
      "router": $cmp.router
    },
    key: 2
  }, [api_custom_element("lwr-outlet", _lwrOutlet, {
    key: 3
  }, [api_element("div", {
    attrs: {
      "slot": "error"
    },
    key: 4
  }, [api_text("This content failed to display.")])])])])];
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];


if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
if (_implicitScopedStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets)
}
tmpl.stylesheetToken = "c-app_app"
