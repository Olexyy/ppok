// store.js
import dialogPolyfill from 'dialog-polyfill';
import Timer from './Timer';
import Result from './Result';
import App from './App';
import SocketHandler from './SocketHandler';

const Store = {
	state: {
		app: new App(new Timer(), new Result(), new SocketHandler()),
		dialogs: {},
	},
	mutations: {}, // commit mutation...
	actions: {
		setDialog (context, value) {
			dialogPolyfill.registerDialog(value.element);
			context.state.dialogs[value.name] = value.element;
		},
		initSocket (context) {
			context.state.app.createSocket(context);
		},
	},
};

export default Store;
