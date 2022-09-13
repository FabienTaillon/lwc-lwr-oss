import _implicitStylesheets from "/1/module/esm/0/l/en-US/mi/lightning%2Ficon%23icon.css%2Fv%2F1_14_7-alpha/latest/lightning_icon_icon_css.js";

import _implicitScopedStylesheets from "/1/module/esm/0/l/en-US/mi/lightning%2Ficon%23icon.scoped.css%3Fscoped%3Dtrue%2Fv%2F1_14_7-alpha/latest/lightning_icon_icon_scoped_css_scoped=true.js";

import _lightningPrimitiveIcon from "/1/module/esm/0/l/en-US/mi/lightning%2FprimitiveIcon%2Fv%2F1_14_7-alpha/latest/lightning_primitiveIcon.js";
import {registerTemplate} from "/1/module/esm/0/l/en-US/mi/lwc%2Fv%2F2_5_8/latest/lwc.js";
function tmpl($api, $cmp, $slotset, $ctx) {
  const {c: api_custom_element, d: api_dynamic_text, t: api_text, h: api_element} = $api;
  return [api_custom_element("lightning-primitive-icon", _lightningPrimitiveIcon, {
    props: {
      "iconName": $cmp._iconName,
      "size": $cmp.size,
      "variant": $cmp.variant,
      "src": $cmp._src
    },
    key: 0
  }, []), $cmp.alternativeText ? api_element("span", {
    classMap: {
      "slds-assistive-text": true
    },
    key: 1
  }, [api_text(api_dynamic_text($cmp.alternativeText))]) : null];
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];


if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
if (_implicitScopedStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets)
}
tmpl.stylesheetToken = "lightning-icon_icon"
