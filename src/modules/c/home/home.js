import { LightningElement, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { getUsers } from 'c/usersWireApi';

export default class Home extends NavigationMixin(LightningElement) {

    users;

    @wire(getUsers)
    wireUsers(data) {
        this.users = [];
        data.forEach(element => {
            const userElement = Object.assign({}, element);
            userElement.userDetailUrl = `userDetail?recordId=${element.id}`;
            this.users.push(userElement);
        });
    }
}