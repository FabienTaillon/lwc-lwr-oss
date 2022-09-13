import _implicitStylesheets from "/1/module/esm/0/l/en-US/mi/c%2Fheader%23header.css%2Fv%2F0_0_1/latest/c_header_header_css.js";

import _implicitScopedStylesheets from "/1/module/esm/0/l/en-US/mi/c%2Fheader%23header.scoped.css%3Fscoped%3Dtrue%2Fv%2F0_0_1/latest/c_header_header_scoped_css_scoped=true.js";

import _lightningIcon from "/1/module/esm/0/l/en-US/mi/lightning%2Ficon%2Fv%2F1_14_7-alpha/latest/lightning_icon.js";
import {registerTemplate} from "/1/module/esm/0/l/en-US/mi/lwc%2Fv%2F2_5_8/latest/lwc.js";
function tmpl($api, $cmp, $slotset, $ctx) {
  const {c: api_custom_element, d: api_dynamic_text, t: api_text, h: api_element} = $api;
  return [api_custom_element("lightning-icon", _lightningIcon, {
    classMap: {
      "slds-m-bottom_small": true
    },
    props: {
      "iconName": "standard:employee_organization",
      "alternativeText": "Users App",
      "title": "Users App"
    },
    key: 0
  }, []), api_element("div", {
    classMap: {
      "slds-text-heading_medium": true,
      "slds-m-bottom_large": true,
      "uppercase": true
    },
    key: 1
  }, [api_text(api_dynamic_text($cmp.label.usersManagementApp))])];
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];


if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
if (_implicitScopedStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets)
}
tmpl.stylesheetToken = "c-header_header"
