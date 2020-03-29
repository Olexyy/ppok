const express    = require('express');
const path       = require('path');
const port       = process.env.PORT || 3000;
const app        = express();
const fs         = require('fs');
var http         = require('http').createServer(app);
const storage    = path.join(__dirname, "..", 'storage');

/**
 * WebSocket Configuration
 */
var io = require('socket.io')(http, {
    handlePreflightRequest: (req, res) => {
        const headers = {
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Allow-Origin": req.headers.origin,
            "Access-Control-Allow-Credentials": true,
            "Socket Powered By:":"Emiga Stream https://github.com/eminmuhammadi/emiga-stream.git"
        };
        res.writeHead(200, headers);
        res.end();
    },
    // path: '/',
    serveClient: true,
    origins: '*:*',
    cookie: true,
    //pingInterval: 1000,
    //pingTimeout: 1000,
    //upgradeTimeout: 1000,   
    allowUpgrades: false,
    //cookie: 'lonley_cookie',
    //cookiePath:'/',
    //cookieHttpOnly:true
});

/**
* Pocker backend implementation.
*/
const pockerPlayers = io.of('/pocker');
const pockerApp = {
    players: {},
    topic: '',
    discuss: false,
};
pockerPlayers.on('connect', function(socket){
    pockerApp.players[socket.id] = {name:'', vote: ''};
    console.log(socket.id);
    console.log(socket.request.headers.cookie);
    pockerPlayers.emit('status', pockerApp);
    console.log('pocker connected');
    socket.on('disconnect', function() {
        delete(pockerApp.players[socket.id]);
        pockerPlayers.emit('status', pockerApp);
        console.log('pocker disconnected');
    });
    socket.on('update', (prop, value) => {
        pockerApp.players[socket.id][prop] = value;
        pockerPlayers.emit('status', pockerApp);
        console.log('pocker update updated');
    });
    socket.on('clear', () => {
        pockerApp.discuss = false;
        pockerApp.topic = '';
        Object.values(pockerApp.players).forEach(player => {
            player.vote = '';
        });
        pockerPlayers.emit('status', pockerApp);
        console.log('pocker clear updated');
    });
    socket.on('topic', value => {
        pockerApp.topic = value;
        pockerPlayers.emit('status', pockerApp);
        console.log('pocker topic updated');
    });
    socket.on('discuss', value => {
        pockerApp.discuss = value;
        pockerPlayers.emit('status', pockerApp);
        console.log('pocker discuss updated');
    });
});
/**
 *   Storage
 */
app.use(express.static(path.join(storage)));

app.get('/', function (req, res) {
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
