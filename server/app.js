class App {

    constructor(io) {
        this.io = io;
        this.players = io.of('/pocker');
        this.app = {
            rooms: {},
            socketMap: {}
        };
    }

    bind() {
        this.players.on('connect', socket => {
            socket.on('update', (room, prop, value) => {
                this.ensureRoom(room);
                this.ensureUser(room, socket);
                this.app[room].players[socket.id][prop] = value;
                this.players.to(room).emit('status', this.app[room]);
            });
            socket.on('clear', room => {
                this.app[room].discuss = 'idle';
                this.app[room].topic = '';
                Object.values(this.app[room].players).forEach(player => {
                    player.vote = '';
                });
                this.players.to(room).emit('status', this.app[room]);
            });
            socket.on('topic', (room, value) => {
                this.app[room].topic = value;
                this.players.to(room).emit('status', this.app[room]);
            });
            socket.on('discuss', (room, value) => {
                this.app[room].discuss = value;
                this.players.to(room).emit('status', this.app[room]);
            });
            socket.on('sound', room => {
                this.players.to(room).emit('sound');
            });
            socket.on('liveness', e => {
                console.log(`socket ${socket.id} is live`);
            });
            socket.on('disconnect', () => {
                this.deleteUser(socket.id);
            });
            socket.on('error', e => {
                this.deleteUser(socket.id);
            });
        });
    }

    ensureRoom(room) {
        if (!this.app.hasOwnProperty(room)) {
            this.app[room] = {
                players: {},
                topic: '',
                discuss: 'idle'
            };
        }
    }

    ensureUser(room, socket) {
        if (!this.app[room].players.hasOwnProperty(socket.id)) {
            this.app[room].players[socket.id] = {name:'', vote: ''};
            this.app.socketMap[socket.id] = room;
            socket.join(room);
        }
    }

    deleteUser(id) {
        if (this.app.socketMap.hasOwnProperty(id)){
            const room = this.app.socketMap[id];
            delete(this.app[room].players[id]);
            delete(this.app.socketMap[id]);
            this.players.to(room).emit('status', this.app[room]);
        }
    }
}

module.exports = App;