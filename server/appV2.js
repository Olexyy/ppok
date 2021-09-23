class AppV2 {

    constructor(io) {
        this.io = io;
        this.sockets = io.of('/dgg');
        this.app = {
            rooms: {},
            socketMap: {}
        };
    }

    bind() {
        this.sockets.on('connect', socket => {
            socket.on('create', (room, uuid) => {
                this.ensureRoom(room);
                this.ensureUser(room, socket, uuid);
                this.sockets.to(room).emit('status', this.app.rooms[room]);
            });
            socket.on('touch', (roomProps = {}) => {
                this.sockets.to(socket.id).emit('touch', {rooms: this.collectRooms(roomProps)});
            });
            socket.on('update', (room, userProps = {}, appProps = {}) => {
                this.syncApp(room, appProps);
                const id = this.app.rooms[room].sockets[socket.id];
                this.syncUser(room, id, userProps);
                this.sockets.to(room).emit('status', this.app.rooms[room]);
            });
            socket.on('trigger', (room, name, data = {}) => {
                this.sockets.to(room).emit('trigger', name, data);
            });
            socket.on('bulk', (room, usersProps = {}, appProps = {}) => {
                this.syncApp(room, appProps);
                this.syncUsers(room, usersProps);
                this.sockets.to(room).emit('status', this.app.rooms[room]);
            });
            socket.on('kick', (room, uuid) => {
                this.kickUser(room, uuid);
                this.sockets.to(room).emit('status', this.app.rooms[room]);
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

    collectRooms(roomProps) {
        const rooms = {};
        Object.keys(this.app.rooms).forEach(room => {
            rooms[room] = {};
            Object.keys(roomProps).forEach(key => {
                if (this.app.rooms[room].hasOwnProperty(key)) {
                    if (Object(roomProps[key]) === roomProps[key]) {
                        Object.keys(roomProps[key]).forEach(subKey => {
                            if (this.app.rooms[room][key].hasOwnProperty(subKey)) {
                                rooms[room][key][subKey] = this.app.rooms[room][key][subKey];
                            }
                        });
                    }
                    else if (roomProps[key] === '$count') {
                        if (Object(this.app.rooms[room][key]) === this.app.rooms[room][key]) {
                            rooms[room][key] = Object.keys(this.app.rooms[room][key]).length;
                        }
                    }
                    // else {
                    //     rooms[room] = this.app.rooms[room].state[key];
                    // }
                }
            });
        });
        return rooms;
    }

    syncApp(room, appProps) {
        Object.keys(appProps).forEach(key => {
            this.app.rooms[room].state[key] = appProps[key];
        });
    }

    syncUser(room, id, userProps) {
        this.app.rooms[room].users[id] = this.app.rooms[room].users[id] || {};
        Object.keys(userProps).forEach(key => {
            this.app.rooms[room].users[id][key] = userProps[key];
        });
    }

    syncUsers(room, userProps) {
        Object.values(this.app.rooms[room].users).forEach(user => {
            Object.keys(userProps).forEach(key => {
                user[key] = userProps[key];
            });
        });
    }

    ensureRoom(room) {
        if (!this.app.rooms.hasOwnProperty(room)) {
            this.app.rooms[room] = {
                sockets: {},
                users: {},
                state: {},
            };
        }
    }

    ensureUser(room, socket, uuid) {
        if (!this.app.rooms[room].sockets.hasOwnProperty(socket.id)) {
            this.app.rooms[room].sockets[socket.id] = uuid;
            this.app.rooms[room].users[uuid] = this.app.rooms[room].users[uuid] || {};
            this.app.socketMap[socket.id] = room;
            socket.join(room);
        }
    }

    kickUser(room, uuid) {
        if (this.app.rooms[room].users.hasOwnProperty(uuid)) {
            delete(this.app.rooms[room].users[uuid]);
        }
        let socketId = null;
        Object.keys(this.app.rooms[room].sockets).forEach(key => {
            if (this.app.rooms[room].sockets[key] === uuid) {
                socketId = key;
            }
        });
        if (socketId) {
            this.sockets.to(socketId).emit('kick');
        }
    }

    deleteUser(id) {
        if (this.app.socketMap.hasOwnProperty(id)){
            const room = this.app.socketMap[id];
            delete(this.app.rooms[room].sockets[id]);
            this.sockets.to(room).emit('status', this.app.rooms[room]);
        }
    }
}

module.exports = AppV2;