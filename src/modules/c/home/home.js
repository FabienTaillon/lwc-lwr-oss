import { LightningElement, wire } from 'lwc';
import { getUsers } from 'c/usersWireApi';

export default class Home extends LightningElement {

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