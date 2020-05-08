const express    = require('express');
const path       = require('path');
const port       = process.env.PORT || 3000;
const app        = express();
const fs         = require('fs');
var http         = require('http').createServer(app);
const storage    = path.join(__dirname, "..", 'store');

/**
 * WebSocket Configuration
 */
var io = require('socket.io')(http, {});

/**
* Pocker backend implementation.
*/
const pockerPlayers = io.of('/pocker');
const pockerApp = {
    rooms: {},
    socketMap: {}
};
pockerPlayers.on('connect', function(socket) {
    console.log('pocker connected');
    socket.on('disconnect', function() {
        if (pockerApp.socketMap.hasOwnProperty(socket.id)){
            const room = pockerApp.socketMap[socket.id];
            delete(pockerApp[room].players[socket.id]);
            delete(pockerApp.socketMap[socket.id]);
            pockerPlayers.to(room).emit('status', pockerApp[room]);
            console.log('pocker player disconnected, room' + room);
        }
    });
    socket.on('update', (room, prop, value) => {
        if (!pockerApp.hasOwnProperty(room)) {
            pockerApp[room] = {
                players: {},
                topic: '',
                discuss: 'idle'
            };
        }
        if (!pockerApp[room].players.hasOwnProperty(socket.id)) {
            pockerApp[room].players[socket.id] = {name:'', vote: ''};
            pockerApp.socketMap[socket.id] = room;
            socket.join(room);
        }
        pockerApp[room].players[socket.id][prop] = value;
        pockerPlayers.to(room).emit('status', pockerApp[room]);
        console.log('pocker update updated, room' + room);
    });
    socket.on('clear', room => {
        pockerApp[room].discuss = 'idle';
        pockerApp[room].topic = '';
        Object.values(pockerApp[room].players).forEach(player => {
            player.vote = '';
        });
        pockerPlayers.to(room).emit('status', pockerApp[room]);
        console.log('pocker clear updated, room' + room);
    });
    socket.on('topic', (room, value) => {
        pockerApp[room].topic = value;
        pockerPlayers.to(room).emit('status', pockerApp[room]);
        console.log('pocker topic updated, room' + room);
    });
    socket.on('discuss', (room, value) => {
        pockerApp[room].discuss = value;
        pockerPlayers.to(room).emit('status', pockerApp[room]);
        console.log('pocker discuss updated, room' + room);
    });
    socket.on('sound', (room) => {
        pockerPlayers.to(room).emit('sound');
        console.log('pocker sound, room' + room);
    });
    socket.on('error', e => {
        if (pockerApp.socketMap.hasOwnProperty(socket.id)) {
            const room = pockerApp.socketMap[socket.id];
            delete(pockerApp[room].players[socket.id]);
            delete(pockerApp.socketMap[socket.id]);
            console.log('pocker socket error, room' + room);
        }
    });
    socket.on('liveness', e => {
        console.log('socket is live');
    });
});
/**
 *   Storage
 */
app.use(express.static(path.join(storage)));

app.get('/', function (req, res) {
    res.sendFile(path.join(storage+'/index.html'));
});

app.get('/room/:id', function (req, res) {
    res.sendFile(path.join(storage+'/index.html'));
});

app.get('/:file', function (req, res) {
    const fileName = req.params.file;
    const filePath = path.join(storage, `${fileName}.html`);
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    }
    else {
      res.status(404).end('Not found');
    }
});

http.listen(port, () => console.log(`\x1b[40m`,`\x1b[32m`,
`
    [+] Server         : http://0.0.0.0:${port}
    [+] Storage Path   : ${storage}

    [~] Running Server...

`,`\x1b[0m`));
