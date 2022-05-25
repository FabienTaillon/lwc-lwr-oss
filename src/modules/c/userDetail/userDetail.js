import { LightningElement, wire } from 'lwc';
import { CurrentPageReference, NavigationMixin } from 'lightning/navigation';
import { getUser } from 'c/usersWireApi';

export default class UserDetail extends NavigationMixin(LightningElement) {

    userId;

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
        this[NavigationMixin.Navigate]({
            type: 'home'
        });
    }
}
