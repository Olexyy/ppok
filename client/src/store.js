// store.js
import dialogPolyfill from 'dialog-polyfill';
import io from './../node_modules/socket.io-client/dist/socket.io';
import GithubCli from './github_cli';

const store = {
	state: {
		window: window,
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
		dialogs: {},
		repoConnect: false,
		// Local Github variables.
		iAmRepoConnect: false,
		githubToken:'',
		githubUser:'',
		githubCli: new GithubCli(),
		// Shared Github resources.
		githubData: {
			owner: '',
			repo: '',
			repos: [],
			issues: [],
			labels: [],
			page: 1,
			topicIssue: null,
		}
	},
	mutations: {
		setIAmRepoConnect(state, value) {
			state.iAmRepoConnect = value;
		},
		setTopicIssue (state, value) {
			state.githubData.topicIssue = value;
		},
		setRepos (state, value) {
			state.githubData.repos = value;
		},
		setRepo (state, value) {
			state.githubData.repo = value;
		},
		setIssues(state, value) {
			state.githubData.issues = value;
		},
		setLabels(state, value) {
			state.githubData.labels = value;
		},
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
			state.instance = value;
			let unvoted = false;
			let repoConnect = false;
			if (value.hasOwnProperty('players')) {
				Object.keys(value.players).forEach(function(id) {
					if (value.players[id].vote == '') {
						unvoted = true;
					}
					if (id === state.socket.id) {
						state.vote = value.players[id].vote;
						state.userName = value.players[id].name;
					}
					if (value.players[id].repoConnect) {
						repoConnect = true;
					}         
				});
			}
			state.repoConnect = repoConnect;
			state.anyUnvoted = unvoted;
			state.discuss = value.discuss;
			state.topic = value.topic;
			state.githubData = value.githubData;
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
		setIAmRepoConnect(context, value) {
			context.commit('setIAmRepoConnect', value);
		},
		setIssues(context, value) {
			context.commit('setIssues', value);
		},
		setLabels(context, value) {
			context.commit('setLabels', value);
		},
		setTimer (context, value) {
			context.commit('setTimer', value);
		},
		setTime (context, value) {
			context.commit('setTime', value);
		},
		setRoom (context, value) {
			context.commit('setRoom', value);
		},
		setOwner(context, value) {
			const githubData = context.state.githubData;
			githubData.owner = value;
			context.state.socket.emit(
				'updateRoom', context.state.room,
				{ githubData: githubData },
			);
		},
		setRepos(context, value) {
			const githubData = context.state.githubData;
			githubData.repos = value;
			context.state.socket.emit(
				'updateRoom', context.state.room,
				{ githubData: githubData },
			);
		},
		setRepo(context, value) {
			context.commit('setRepo', value);
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
		setTopic(context, value) {
			context.state.socket.emit('topic', context.state.room, value);
		},
		setTopicIssue (context, value) {
			const githubData = context.state.githubData;
			githubData.topicIssue = value;
			context.state.socket.emit(
				'updateRoom', context.state.room,
				{ topic: value.html_url, githubData: githubData },
			);
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
				let pockerData = window.localStorage.getItem('pocker_data');
				if (storeName) {
					socket.emit('update', context.state.room, 'name', storeName);
				}
				else {
					context.state.dialogs.name.showModal();
				}
				if (pockerData) pockerData = JSON.parse(pockerData);
				context.state.githubCli.fromObject(pockerData).then(data => {
					if (data) {
						context.state.socket.emit('update', context.state.room, 'repoConnect', true);
						context.dispatch('setIAmRepoConnect', true);
						context.state.githubUser = context.state.githubCli.user;
						context.state.githubToken = context.state.githubCli.token;
						context.dispatch('setOwner', context.state.githubCli.owner);
						context.state.githubCli.getRepos().then(repos => {
							context.dispatch('setRepos', repos);
						});
					}
				});
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
