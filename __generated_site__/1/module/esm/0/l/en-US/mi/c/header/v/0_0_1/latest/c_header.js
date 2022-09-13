import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "/1/module/esm/0/l/en-US/mi/lwc%2Fv%2F2_5_8/latest/lwc.js";
import _tmpl from "/1/module/esm/0/l/en-US/mi/c%2Fheader%23header.html%2Fv%2F0_0_1/latest/c_header_header_html.js";
import USERS_MANAGEMENT_APP from '/1/module/esm/0/l/en-US/mi/%40salesforce%2Flabel%2Fc.usersManagementApp%2Fv%2F0_6_5/latest/@salesforce_label_c_usersManagementApp.js';

class Home extends LightningElement {
  constructor(...args) {
    super(...args);
    this.label = {
      usersManagementApp: USERS_MANAGEMENT_APP
    };
  }

}

_registerDecorators(Home, {
  fields: ["label"]
});

export default _registerComponent(Home, {
  tmpl: _tmpl
});