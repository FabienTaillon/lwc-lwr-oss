export default class NamedPageHandler {
    callback;

    constructor(callback) {
        this.callback = callback;
    }

    dispose() {
        /* noop */
    }

    update({ attributes }) {
        let viewGetter;

        // Get the "pageName" from the incoming page reference
        switch (attributes.pageName) {
            case 'userDetail':
                viewGetter = () => import('c/userDetail');
                break;
            default:
                return;
        }

        this.callback({
            viewset: {
                default: viewGetter,
            },
        });
    }
}