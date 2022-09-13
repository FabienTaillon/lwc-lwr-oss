import { LightningElement } from 'lwc';
import USERS_MANAGEMENT_APP from '@salesforce/label/c.usersManagementApp';

export default class Home extends LightningElement {

    label = {
        usersManagementApp: USERS_MANAGEMENT_APP
    };
}