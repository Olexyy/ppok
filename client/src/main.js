import Vue from 'vue';
import App from './App.vue';
import Vuex from 'vuex';
import Store from './app/Store';

Vue.config.productionTip = false;
Vue.use(Vuex);
new Vue({
  store: new Vuex.Store(Store),
  render: h => h(App),
}).$mount('#app');
