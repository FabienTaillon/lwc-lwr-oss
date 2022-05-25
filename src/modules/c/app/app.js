import { LightningElement } from 'lwc';
import { createRouter } from 'lwr/router';

// Route definition array
const routes = [
    {
        id: 'home',
        uri: '/',
        handler: () => import('c/homePageHandler'),
        page: {
            type: 'home',
        },
    },
    {
        id: 'namedPage',
        uri: '/:pageName',
        handler: () => import('c/namedPageHandler'),
        page: {
            type: 'namedPage',
            attributes: {
                pageName: ':pageName',
            },
        },
    },
];

export default class HelloWorldApp extends LightningElement {

    router = createRouter({ routes });
    homeReference = { 
        type: 'home' 
    };

    userReference = { 
        type: 'namedPage', 
        attributes: {
            pageName: 'userDetail'
        }
    };
}
