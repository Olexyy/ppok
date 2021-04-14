import io from 'socket.io-client/dist/socket.io';

class SocketHandler {

    create(app, context) {
        const socket = io('/' + app.appKey, {
            transports: ['websocket'],
            upgrade: false
        });
        window.addEventListener('unload', () => {
            if (socket) socket.close();
        });
        socket.on('connect', () => {
            context.state.dialogs.start.close();
            // Generate local identifier if any.
            const localStore = app.getLocalData();
            app.setLocalData(localStore);
            socket.emit('create', app.room, localStore.uuid);
        });
        socket.on('error', () => {
            context.state.dialogs.error.showModal();
        });
        socket.on('disconnect', () => {
            context.state.dialogs.error.showModal();
        });
        socket.on('status', data => {
            app.mapData(data, context);
        });
        socket.on('trigger', (name, data) => {
            app.trigger(name, data, context);
        });
        socket.on('kick', () => {
            socket.disconnect();
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
