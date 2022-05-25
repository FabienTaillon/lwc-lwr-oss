const endpoint = 'https://jsonplaceholder.typicode.com/users/';

export class getUsers {
    connected = false;
    bookId;

    constructor(dataCallback) {
        console.log('constructor');
        this.dataCallback = dataCallback;
    }

    connect() {
        console.log('connect');
        this.connected = true;
        //this.provideUserWithId(1);
    }

    disconnect() {
        console.log('disconnect');
        this.connected = false;
    }

    update(config) {
        console.log('update');
        console.log(config);
        //this.provideUserWithId(config.id);
        
        fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            this.dataCallback(data);
        });
        /*
        if (this.bookId !== config.id) {
            this.bookId = config.id;
            this.provideUserWithId(this.bookId);
        }
        */
    }

    provideUsers() {
        fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        });

        /*
        if (this.connected && this.bookId !== undefined) {
            const book = bookEndpoint.getById(id);

            if (book) {
                this.dataCallback(Object.assign({}, book));
            } else {
                this.dataCallback(null);
            }
        }
        */
    }
}

export class getUser {
    connected = false;
    bookId;

    constructor(dataCallback) {
        console.log('constructor');
        this.dataCallback = dataCallback;
    }

    connect() {
        console.log('connect');
        this.connected = true;
        //this.provideUserWithId(1);
    }

    disconnect() {
        console.log('disconnect');
        this.connected = false;
    }

    update(config) {
        console.log('update');
        console.log(config);
        
        fetch(endpoint+config.id)
        .then(response => response.json())
        .then(data => {
            this.dataCallback(data);
        });

        /*
        if (this.bookId !== config.id) {
            this.bookId = config.id;
            this.provideUserWithId(this.bookId);
        }
        */
    }

    provideUserWithId(id) {
        fetch(endpoint+id)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        });

        /*
        if (this.connected && this.bookId !== undefined) {
            const book = bookEndpoint.getById(id);

            if (book) {
                this.dataCallback(Object.assign({}, book));
            } else {
                this.dataCallback(null);
            }
        }
        */
    }
}