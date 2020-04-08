import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import moment from 'moment';

Vue.config.productionTip = false;
Vue.prototype.$moment = moment;
Vue.prototype.$http = axios;
axios.defaults.baseURL = 'http://localhost:3000/api';

new Vue({
    router,
    axios,
    vuetify,
    render: function(h) {
        return h(App);
    }
}).$mount("#app");
