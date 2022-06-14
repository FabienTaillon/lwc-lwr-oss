import { LightningElement, api, wire } from 'lwc';
import { NavigationContext, navigate } from 'lwr/navigation';

export default class UsersList extends LightningElement {

    @api users;

    @wire(NavigationContext)
    navContext;

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