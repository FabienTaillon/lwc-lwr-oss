const endpoint = 'https://jsonplaceholder.typicode.com/users/';

export class getUsers {
    connected = false;

    constructor(dataCallback) {
        this.dataCallback = dataCallback;
    }

    connect() {
        this.connected = true;
    }

    disconnect() {
        this.connected = false;
    }

    update(config) {  
        fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            this.dataCallback(data);
        });
    }
}

export class getUser {
    connected = false;

    constructor(dataCallback) {
        this.dataCallback = dataCallback;
    }

    connect() {
        this.connected = true;
    }

    disconnect() {
        this.connected = false;
    }

    update(config) {
        if (config && config.id) {
            fetch(endpoint+config.id)
            .then(response => response.json())
            .then(data => {
                this.dataCallback(data);
            });
        }
    }
}