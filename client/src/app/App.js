/* eslint-disable no-prototype-builtins */
import {v4 as uuidV4} from "uuid";

class App {

    constructor(timer, result, socketHandler) {
        // Namespace id.
        this.appKey = 'poker';
        this.vote = '';
        this.topic = '';
        this.data = null;
        this.userName = '';
        this.discuss = 'idle';
        this.anyUnvoted = false;
        this.timer = timer;
        this.result = result;
        this.room = '';
        this.socketHandler = socketHandler;
        this.socket = null;
        this.voting = true;
        this.uuid = '';
    }

    initRoom() {
        let match = window.location.pathname.match(/\/room\/(.+)/);
        if (!match || match.length !== 2) {
            this.room = 'global';
        } else {
            this.room = match[1];
        }
        console.log(this.room);
    }

    nameExists(name) {
        let exists = false;
        Object.values(this.data.users).forEach(user => {
            if (typeof user === 'object') {
                if (user.hasOwnProperty('name')) {
                    if (user.name === name) {
                        exists = true;
                    }
                }
            }
        });
        return exists;
    }

    isObject(value) {
        return Object(value) === value;
    }

    buildUser(data) {
        const uuid = this.getLocalData().uuid;
        if (!data.hasOwnProperty('uuid')) {
            data.uuid = uuid;
        }
        if (!data.hasOwnProperty('name')) {
            if (this.data.users.hasOwnProperty(uuid)) {
                data.name = this.data.users[uuid].name || '';
            }
            else data.name = '';
        }
        if (!data.hasOwnProperty('vote')) {
            if (this.data.users.hasOwnProperty(uuid)) {
                data.vote = this.data.users[uuid].vote || '';
            }
            else data.vote = '';
        }
        if (!data.hasOwnProperty('voting')) {
            if (this.data.users.hasOwnProperty(uuid)) {
                data.voting = this.data.users[uuid].voting || true;
            }
            else data.voting = true;
        }
        return data;
    }

    isOnline(uuid) {
        let online = false;
        Object.values(this.data.sockets).forEach(id => {
            if (id === uuid) online = true;
        });
        return online;
    }

    validateData(value) {
        let valid = this.isObject(value) &&
            value.hasOwnProperty('sockets') &&
            value.hasOwnProperty('users') &&
            value.hasOwnProperty('state');
        if (valid) {
            const uuid = this.getLocalData().uuid;
            valid = this.isObject(value.users[uuid]);
        }

        return valid;
    }

    mapData(value, context) {
        // Validate incoming data.
        if (!this.validateData(value)) {
            console.log('Incoming data is invalid.');
            if (this.isDebug()) {
                console.log(JSON.stringify(value));
            }
            return;
        }
        // Update fresh data.
        this.data = value;
        const uuid = this.getLocalData().uuid;
        this.uuid = uuid;
        const user = value.users[uuid];
        // This is first time sync.
        if (!user.hasOwnProperty('name')) {
            const storeData = this.getLocalData();
            let storeName = storeData.name;
            if (storeData.name !== '' && !this.nameExists(storeName)) {
                this.emit('update', this.buildUser({
                    name: storeData.name
                }));
                return;
            }
            else {
                if (!context.state.dialogs.name.hasAttribute('open')) {
                    context.state.dialogs.name.showModal();
                }
            }
        }
        this.userName = user.name;
        this.voting = user.voting;
        this.result.clear();
        let unVoted = false;
        Object.keys(value.users).forEach((id) => {
            if (value.users[id].vote === '') {
                // Take into account only online users.
                if (this.isOnline(id)) {
                    // Take into account only voting users.
                    if (value.users[id].voting) {
                        unVoted = true;
                    }
                }
            }
            this.result.addResult(value.users[id].vote, id);
            if (id === uuid) {
                this.vote = value.users[id].vote;
                this.userName = value.users[id].name;
            }
        });
        this.anyUnvoted = unVoted;
        this.discuss = value.state.discuss || 'idle';
        this.topic = value.state.topic || '';
        // If we just started discuss.
        if (this.discuss === 'discuss') {
            this.timer.start();
        }
        // If everybody voted or we force result.
        if ((!this.anyUnvoted && this.discuss === 'discuss') || this.discuss === 'result') {
            this.timer.stop();
            this.result.submit();
        }
        // If we have initial phase.
        if (this.discuss === 'idle') {
            this.timer.clear();
            this.result.clear();
        }
    }

    createSocket(context) {
        this.socket = this.socketHandler.create(this, context);
    }
    // eslint-disable-next-line no-unused-vars
    trigger(name, data, context) {
        if (name === 'sound') {
            let src = '/pop_50.mp3';
            let audio = new Audio(src);
            audio.play();
        }
    }

    emit(name, value1 = {}, value2 = {}, value3 = {}) {
        return this.socket.emit(name, this.room, value1, value2, value3);
    }

    getQueryParam(name, url = window.location.href) {
        const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
        const results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    isSU() {
        return this.getQueryParam('su') === 'me';
    }

    isDebug() {
        return this.getQueryParam('debug') === '1';
    }

    toJson() {
        return {
            vote: this.vote,
            topic: this.topic,
            data: this.data,
            userName: this.userName,
            discuss: this.discuss,
            anyUnVoted: this.anyUnvoted,
            timer: this.timer,
            result: this.result,
            room: this.room,
            uuid: this.uuid
        };
    }

    getLocalData() {
        const data = window.localStorage.getItem(this.appKey);
        if (!data) {
            const uuid = uuidV4();
            return { uuid: uuid, name : ''};
        }
        return JSON.parse(data);
    }

    setLocalData(data) {
        window.localStorage.setItem(this.appKey, JSON.stringify(data));
    }
}

export default App;