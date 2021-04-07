import io from 'socket.io-client/dist/socket.io';

class SocketHandler {

    create(context) {
        const socket = io('/pocker', {
            transports: ['websocket'],
            upgrade: false
        });
        window.addEventListener('unload', () => {
            if (socket) socket.close();
        });
        socket.on('connect', () => {
            context.state.dialogs.start.close();
            let storeName = window.localStorage.getItem('pocker_name');
            if (storeName) {
                socket.emit('update', context.state.app.room, 'name', storeName);
            }
            else {
                context.state.dialogs.name.showModal();
            }
        });
        socket.on('error', function() {
            context.state.dialogs.error.showModal();
        });
        socket.on('disconnect', function() {
            context.state.dialogs.error.showModal();
        });
        socket.on('status', function(data) {
            context.state.app.setData(data);
        });
        socket.on('sound', function() {
            let src = '/ding2.mp3';
            let audio = new Audio(src);
            audio.play();
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