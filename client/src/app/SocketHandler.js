import io from 'socket.io-client/dist/socket.io';
import { v4 as uuidV4 } from 'uuid';

class SocketHandler {

    getData() {
        const data = window.localStorage.getItem(this.key);
        if (!data) {
            const uuid = uuidV4();
            return { uuid: uuid, name : ''};
        }
        return JSON.parse(data);
    }

    setData(data) {
        window.localStorage.setItem(this.key, JSON.stringify(data));
    }

    create(context) {
        // Namespace id.
        this.key = 'poker';
        const socket = io('/' + this.key, {
            transports: ['websocket'],
            upgrade: false
        });
        window.addEventListener('unload', () => {
            if (socket) socket.close();
        });
        socket.on('connect', () => {
            context.state.dialogs.start.close();
            // Generate local identifier.
            let localStore = this.getData();
            this.setData(localStore);
            socket.emit('create', context.state.app.room, localStore.uuid);
        });
        socket.on('error', function() {
            context.state.dialogs.error.showModal();
        });
        socket.on('disconnect', function() {
            context.state.dialogs.error.showModal();
        });
        socket.on('status', function(data) {
            context.state.app.setData(data, context);
        });
        socket.on('trigger', function(name, data) {
            context.state.app.trigger(name, data, context);
        });
        const liveness = () => {
            setTimeout(function() {
                socket.emit('liveness');
                liveness();
            }, 30000);
        };
        liveness();

        return socket;
    }
}

export default SocketHandler;