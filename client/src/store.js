// store.js
import dialogPolyfill from 'dialog-polyfill';
import io from './../node_modules/socket.io-client/dist/socket.io';

const store = {
	state: {
		userName: '',
		instance: null,
		anyUnvoted: true,
		discuss: 'idle',
		room: '',
		socket: null,
		vote: '',
		topic: '',
		timer: null,
		time: '',
		dialogs: {}
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
		initSocket (state, instance) {
			// const socket = io('/pocker', {
			// 	transports: ['websocket'],
			// 	upgrade: false
			// });
			// window.addEventListener('unload', () => {
			// 	if (socket) socket.close();
			// });
			// socket.on('connect', () => {
			// 	state.dialogs.start.close();
			// 	let storeName = window.localStorage.getItem('pocker_name');
			// 	if (storeName) {
			// 		socket.emit('update', store.state.room, 'name', storeName);
			// 	}
			// 	else {
			// 		state.dialogs.name.showModal();
			// 	}
			// });
			// socket.on('error', function() {
			// 	state.dialogs.error.showModal();
			// });
			// socket.on('disconnect', function() {
			// 	state.dialogs.error.showModal();
			// });
			// socket.on('status', function(data) {
			// 	instance.$store.dispatch('setInstance', data);
			// });
			// const liveness = () => {
			// 	setTimeout(function() {
			// 		socket.emit('liveness');
			// 		liveness();
			// 	}, 30000);
			// };
			// instance.$store.dispatch('setSocket', socket);
			// liveness();
		},
		setInstance (state, value) {
			state.instance = value;
			let unvoted = false;
			if (value.hasOwnProperty('players')) {
				Object.keys(value.players).forEach(function(id) {
					if (value.players[id].vote == '') {
						unvoted = true;
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
			if (state.discuss === 'discuss') {
				if (state.timer === null) {
					state.timer = {
						sec: 0,
						getSec() {
							let timeObj = new Date(null);
							timeObj.setSeconds(state.timer.sec);
							return timeObj.getUTCMinutes() + ':' + timeObj.getUTCSeconds();
						}
					};
					var handle = setInterval(function() {
						if (!state.timer) {
							clearInterval(handle);
						} else {
							state.timer.sec += 1;
							state.time = state.timer.getSec();
						}
					}, 1000);
				}
			}
			if((!state.anyUnvoted && state.discuss === 'discuss') || state.discuss === 'result') {
				if (state.timer !== null) {
					state.timer = null;
				}
			}
			if (state.discuss === 'idle') {
				state.time = '';
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

export default store;
