import { LightningElement, wire } from 'lwc';
import { CurrentPageReference, NavigationContext, navigate } from 'lwr/navigation';
import { getUser } from 'c/usersWireApi';

export default class UserDetail extends LightningElement {

    userId;

    @wire(NavigationContext)
    navContext;

    @wire(CurrentPageReference)
    pageRef(ref) {
        this.userId = ref.state.recordId;
    }

    @wire(getUser, { id: '$userId'})
    userDetail;

    navigateHome(event) {
        event.preventDefault();
        this.navigateBack();
    }

    navigateBack() {
        if (this.navContext) {
            navigate(this.navContext, {
                type: 'home'
            });
        }
    }
}
