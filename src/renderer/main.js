import Vue from "vue";
import axios from "axios";

import App from "./App";
import router from "./router";
import store from "./store";

// user imports
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import VueSplit from "vue-split-panel";

import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/css/fontawesome.css";

import "sl-vue-tree/dist/sl-vue-tree-dark.css";

// use
Vue.use(VueSplit);
Vue.use(Buefy, {
  defaultIconPack: "fas"
});
if (!process.env.IS_WEB) Vue.use(require("vue-electron"));
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: "<App/>"
}).$mount("#app");
