import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import cookies from './classes/Cookies';

import bModal from 'bootstrap-vue/es/directives/modal/modal';
Vue.directive('b-modal', bModal);

new Vue({
  el: '#app',
  router,
  store,
  bModal,
  cookies,
  components: { App },
  template: '<App/>'
});
