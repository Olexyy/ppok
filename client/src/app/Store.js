// store.js
import dialogPolyfill from 'dialog-polyfill';
import io from 'socket.io-client/dist/socket.io';
import Timer from './Timer';
import Result from './Result';

const Store = {
	state: {
		userName: '',
		instance: null,
		anyUnvoted: true,
		discuss: 'idle',
		room: '',
		socket: null,
		vote: '',
		topic: '',
		timer: new Timer(),
		dialogs: {},
		result: new Result(),
	},
	mutations: {
		setTimer (state, value) {
			state.timer = value;
		},
		setTime (state, value) {
			state.time = value;
		},
		setRoom (state, value) {
			state.room = value;
		},
		setUserName (state, value) {
			state.userName = value;
		},
		setSocket (state, value) {
			state.socket = value;
		},
		setDialog (state, value) {
			dialogPolyfill.registerDialog(value.element);
			state.dialogs[value.name] = value.element;
		},
		setInstance (state, value) {
			// TODO move all business logic to separate class.
			state.instance = value;
			let unvoted = false;
			if (Object.prototype.hasOwnProperty.call(value,'players')) {
				Object.keys(value.players).forEach(function(id) {
					if (value.players[id].vote === '') {
						unvoted = true;
					}
					else {
						state.result.addResult(value.players[id].vote);
					}
					if (id === state.socket.id) {
						state.vote = value.players[id].vote;
						state.userName = value.players[id].name;
					}          
				});
			}
			state.anyUnvoted = unvoted;
			state.discuss = value.discuss;
			state.topic = value.topic;
			// If we just started discuss.
			if (state.discuss === 'discuss') {
				state.timer.start();
			}
			// If everybody voted or we force result.
			if((!state.anyUnvoted && state.discuss === 'discuss') || state.discuss === 'result') {
				state.timer.stop();
				state.result.submit();
			}
			// If we have initial phase.
			if (state.discuss === 'idle') {
				state.timer.clear();
				state.result.clear();
			}
		},
	},
	actions: {
		setTimer (context, value) {
			context.commit('setTimer', value);
		},
		setTime (context, value) {
			context.commit('setTime', value);
		},
		setRoom (context, value) {
			context.commit('setRoom', value);
		},
		setUserName (context, value) {
			context.commit('setUserName', value);
		},
		setInstance (context, value) {
			context.commit('setInstance', value);
		},
		setSocket (context, value) {
			context.commit('setSocket', value);
		},
		setDialog (context, value) {
			context.commit('setDialog', value);
		},
		initRoom (context) {
			// TODO move to separate class.
			let match = window.location.pathname.match(/\/room\/(.+)/);
			let room = null;
			if (!match || match.length !== 2) {
				room = 'default';
			} else {
				room =  match[1];
			}
			context.commit('setRoom', room);
		},
		initSocket (context) {
			// TODO move to separate class.
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
					socket.emit('update', context.state.room, 'name', storeName);
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
				context.dispatch('setInstance', data);
			});
			socket.on('sound', function() {
				let src = '/ding.mp3';
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
			context.commit('setSocket', socket);
		},
	},
};

export default Store;
