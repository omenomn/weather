window.$ = window.jQuery = require('jquery');
window.moment = require('moment');

moment.locale('pl');
// import 'bootstrap';

import Vue from 'vue';
import Vuex from 'vuex'
import VueRouter from 'vue-router';
import GooglePlacesAutocompletePlugin from 'vue-better-google-places-autocomplete'
import VuePlaceAutocomplete from 'vue-place-autocomplete';
import VueForm from 'vue-form'

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(GooglePlacesAutocompletePlugin)
Vue.use(VuePlaceAutocomplete);
Vue.use(VueForm);

import App from './views/App.vue';

import store from './store/index'
import {router} from "./routes/router.js"
import './components'

const app = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  mounted() {}
});