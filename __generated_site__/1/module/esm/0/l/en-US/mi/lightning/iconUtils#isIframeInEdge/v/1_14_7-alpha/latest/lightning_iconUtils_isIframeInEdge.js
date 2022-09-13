import _tmpl from "/1/module/esm/0/l/en-US/mi/lightning%2FiconUtils%23isIframeInEdge.html%2Fv%2F1_14_7-alpha/latest/lightning_iconUtils_isIframeInEdge_html.js";
import { registerComponent as _registerComponent } from "/1/module/esm/0/l/en-US/mi/lwc%2Fv%2F2_5_8/latest/lwc.js";
// Taken from https://github.com/jonathantneal/svg4everybody/pull/139
// Remove this iframe-in-edge check once the following is resolved https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/8323875/
const isEdgeUA = /\bEdge\/.(\d+)\b/.test(navigator.userAgent);
const inIframe = window.top !== window.self;
const isIframeInEdge = isEdgeUA && inIframe;
export default _registerComponent(isIframeInEdge, {
  tmpl: _tmpl
});