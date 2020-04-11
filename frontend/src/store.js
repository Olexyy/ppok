// store.js
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
		}
	},
};

export default store;
