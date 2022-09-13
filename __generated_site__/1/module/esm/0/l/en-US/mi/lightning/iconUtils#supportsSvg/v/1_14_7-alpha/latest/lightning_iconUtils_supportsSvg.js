import _tmpl from "/1/module/esm/0/l/en-US/mi/lightning%2FiconUtils%23supportsSvg.html%2Fv%2F1_14_7-alpha/latest/lightning_iconUtils_supportsSvg_html.js";
import { registerComponent as _registerComponent } from "/1/module/esm/0/l/en-US/mi/lwc%2Fv%2F2_5_8/latest/lwc.js";
import isIframeInEdge from '/1/module/esm/0/l/en-US/mi/lightning%2FiconUtils%23isIframeInEdge%2Fv%2F1_14_7-alpha/latest/lightning_iconUtils_isIframeInEdge.js'; // Taken from https://git.soma.salesforce.com/aura/lightning-global/blob/999dc35f948246181510df6e56f45ad4955032c2/src/main/components/lightning/SVGLibrary/stamper.js#L89-L98
// Which looks like it was inspired by https://github.com/jonathantneal/svg4everybody/blob/377d27208fcad3671ed466e9511556cb9c8b5bd8/lib/svg4everybody.js#L92-L107
// Modify at your own risk!

const newerIEUA = /\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/;
const webkitUA = /\bAppleWebKit\/(\d+)\b/;
const olderEdgeUA = /\bEdge\/12\.(\d+)\b/;
const isIE = newerIEUA.test(navigator.userAgent) || (navigator.userAgent.match(olderEdgeUA) || [])[1] < 10547 || (navigator.userAgent.match(webkitUA) || [])[1] < 537;
const supportsSvg = !isIE && !isIframeInEdge;
export default _registerComponent(supportsSvg, {
  tmpl: _tmpl
});