class App {

    constructor(timer, result, socketHandler) {
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

    setData(value) {
        this.data = value;
        let unvoted = false;
        if (Object.prototype.hasOwnProperty.call(value,'players')) {
            this.result.clear();
            Object.keys(value.players).forEach((id) => {
                if (value.players[id].vote === '') {
                    unvoted = true;
                }
                this.result.addResult(value.players[id].vote, id);
                if (id === this.socket.id) {
                    this.vote = value.players[id].vote;
                    this.userName = value.players[id].name;
                }          
            });
        }
        this.anyUnvoted = unvoted;
        this.discuss = value.discuss;
        this.topic = value.topic;
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
        this.socket = this.socketHandler.create(context);
    }

    emit(name, value1 = null, value2 = null) {
        return this.socket.emit(name, this.room, value1, value2);
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
}

export default App;