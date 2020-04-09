import Vue from 'vue';
import App from './App.vue';
import Vuex from 'vuex';
import store from './store';

window.io = require('./js/socket.io');
window.jQuery = require('./js/jquery.min.js');
window.$ = window.jQuery;

Vue.config.productionTip = false;
Vue.use(Vuex);
new Vue({
  store: new Vuex.Store(store),
  render: h => h(App),
}).$mount('#app');
