window.$ = window.jQuery = require('jquery');
window.moment = require('moment');

moment.locale('pl');

import Vue from 'vue';
import Vuex from 'vuex'
import VueRouter from 'vue-router';
import VueForm from 'vue-form'

Vue.use(VueRouter)
Vue.use(VueForm);

import App from './views/App.vue';

import store from './store/index'
import {router} from "./routes/router.js"

const app = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  mounted() {}
});