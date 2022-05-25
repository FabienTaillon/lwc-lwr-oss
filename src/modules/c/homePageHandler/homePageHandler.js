export default class HomePageHandler {
    callback;

    constructor(callback) {
        this.callback = callback;
    }

    dispose() {
        /* noop */
    }

    update() {
        this.callback({
            viewset: {
                default: () => import('c/home'),
            },
        });
    }
}