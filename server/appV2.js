class AppV2 {

    constructor(io) {
        this.io = io;
        this.players = io.of('/poker');
        this.app = {
            rooms: {},
            socketMap: {}
        };
    }

    bind() {
        this.players.on('connect', socket => {
            socket.on('create', (room, uuid) => {
                this.ensureRoom(room);
                this.ensureUser(room, socket, uuid);
                this.players.to(room).emit('status', this.app[room]);
            });
            socket.on('update', (room, userProps = {}, appProps = {}) => {
                this.syncApp(room, appProps);
                const id = this.app[room].players[socket.id];
                this.syncUser(room, id, userProps);
                this.players.to(room).emit('status', this.app[room]);
            });
            socket.on('trigger', (room, name, data = {}) => {
                this.players.to(room).emit('trigger', name, data);
            });
            socket.on('bulk', (room, usersProps = {}, appProps = {}) => {
                this.syncApp(room, appProps);
                this.syncUsers(room, usersProps);
                this.players.to(room).emit('status', this.app[room]);
            });
            socket.on('liveness', () => {
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

    syncApp(room, appProps) {
        Object.keys(appProps).forEach(key => {
            this.app[room].state[key] = appProps[key];
        });
    }

    syncUser(room, id, userProps) {
        this.app[room].users[id] = this.app[room].users[id] || {};
        Object.keys(userProps).forEach(key => {
            this.app[room].users[id][key] = userProps[key];
        });
    }

    syncUsers(room, userProps) {
        Object.values(this.app[room].users).forEach(user => {
            Object.keys(userProps).forEach(key => {
                user[key] = userProps[key];
            });
        });
    }

    ensureRoom(room) {
        if (!this.app.hasOwnProperty(room)) {
            this.app[room] = {
                players: {},
                users: {},
                state: {},
            };
        }
    }

    ensureUser(room, socket, uuid) {
        if (!this.app[room].players.hasOwnProperty(socket.id)) {
            this.app[room].players[socket.id] = uuid;
            this.app[room].users[uuid] = this.app[room].users[uuid] || {};
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

module.exports = AppV2;