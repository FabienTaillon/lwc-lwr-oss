import _implicitStylesheets from "/1/module/esm/0/l/en-US/mi/lightning%2FprimitiveIcon%23primitiveIcon.css%2Fv%2F1_14_7-alpha/latest/lightning_primitiveIcon_primitiveIcon_css.js";

import _implicitScopedStylesheets from "/1/module/esm/0/l/en-US/mi/lightning%2FprimitiveIcon%23primitiveIcon.scoped.css%3Fscoped%3Dtrue%2Fv%2F1_14_7-alpha/latest/lightning_primitiveIcon_primitiveIcon_scoped_css_scoped=true.js";

import {registerTemplate, sanitizeAttribute} from "/1/module/esm/0/l/en-US/mi/lwc%2Fv%2F2_5_8/latest/lwc.js";
function tmpl($api, $cmp, $slotset, $ctx) {
  const {fid: api_scoped_frag_id, h: api_element} = $api;
  return [api_element("svg", {
    className: $cmp.computedClass,
    attrs: {
      "focusable": "false",
      "data-key": $cmp.name,
      "aria-hidden": "true"
    },
    key: 0,
    svg: true
  }, [api_element("use", {
    attrs: {
      "xlink:href": sanitizeAttribute("use", "http://www.w3.org/2000/svg", "xlink:href", api_scoped_frag_id($cmp.href))
    },
    key: 1,
    svg: true
  }, [])])];
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];


if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
if (_implicitScopedStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets)
}
tmpl.stylesheetToken = "lightning-primitiveIcon_primitiveIcon"
