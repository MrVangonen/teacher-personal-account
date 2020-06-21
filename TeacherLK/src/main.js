import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import moment from 'moment';
import {store} from './store/index'

Vue.config.productionTip = false;
Vue.prototype.$moment = moment;

new Vue({
  router,
  axios,
  vuetify,
  store,

  render: function (h) {
    return h(App);
  }
}).$mount("#app");