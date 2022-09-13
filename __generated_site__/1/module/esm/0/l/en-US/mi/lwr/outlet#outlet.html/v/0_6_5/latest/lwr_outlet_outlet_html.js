import _implicitStylesheets from "/1/module/esm/0/l/en-US/mi/lwr%2Foutlet%23outlet.css%2Fv%2F0_6_5/latest/lwr_outlet_outlet_css.js";

import _implicitScopedStylesheets from "/1/module/esm/0/l/en-US/mi/lwr%2Foutlet%23outlet.scoped.css%3Fscoped%3Dtrue%2Fv%2F0_6_5/latest/lwr_outlet_outlet_scoped_css_scoped=true.js";

import {registerTemplate} from "/1/module/esm/0/l/en-US/mi/lwc%2Fv%2F2_5_8/latest/lwc.js";
function tmpl($api, $cmp, $slotset, $ctx) {
  const {s: api_slot, h: api_element, dc: api_dynamic_component, f: api_flatten} = $api;
  return [api_element("div", {
    attrs: {
      "role": "alert"
    },
    key: 0
  }, [$cmp.hasError ? api_slot("error", {
    attrs: {
      "name": "error"
    },
    key: 1
  }, [], $slotset) : null]), api_element("div", {
    attrs: {
      "role": "region",
      "tabindex": "-1"
    },
    key: 2
  }, api_flatten([api_dynamic_component("lwr-dynamic", $cmp.viewCtor, {
    key: 3
  }, [])]))];
}
export default registerTemplate(tmpl);
tmpl.slots = ["error"];
tmpl.stylesheets = [];


if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
if (_implicitScopedStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets)
}
tmpl.stylesheetToken = "lwr-outlet_outlet"
