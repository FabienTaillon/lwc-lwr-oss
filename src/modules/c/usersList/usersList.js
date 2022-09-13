import { LightningElement, api, wire } from 'lwc';
import { NavigationContext, navigate } from 'lwr/navigation';
import USERS_CARD_TITLE from '@salesforce/label/c.usersCardTitle';

export default class UsersList extends LightningElement {

    @api users;

    @wire(NavigationContext)
    navContext;

    label = {
        usersCardTitle: USERS_CARD_TITLE
    };

    navigateToUser(event) {
        // Prevent href
        event.preventDefault();

        if (this.navContext) {
            navigate(this.navContext, {
                type: 'namedPage',
                attributes: {
                    pageName: 'userDetail'
                },
                state: {
                    recordId: event.currentTarget.dataset.id
                }
            });
        }
    }

    handleFollow() {
        window.open('https://twitter.com/FabienTaillon', '_blank').focus();
    }
}