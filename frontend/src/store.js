// store.js
const store = {
	state: {
		user: {},
		instance: null,
		anyUnvoted: true,
		discuss: 'idle',
		room: null,
		socket: null,
		vote: '',
	},
	mutations: {
		setRoom (state, value) {
			state.room = value;
		},
		setUser (state, value) {
			state.user = value;
		},
		setSocket (state, value) {
			state.socket = value;
		},
		setInstance (state, value) {
			state.instance = value;
			let unvoted = false;
			Object.keys(value.players).forEach(function(id) {
                if (value.players[id].vote == '') {
                    unvoted = true;
				}
				if (id === state.socket.id) {
					state.vote = value.players[id].vote;
				}          
			});
			state.anyUnvoted = unvoted;
			state.discuss = value.discuss;
		},
	},
	actions: {
		setRoom (context, value) {
			context.commit('setRoom', value);
		},
		setUser (context, value) {
			context.commit('setUser', value);
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
