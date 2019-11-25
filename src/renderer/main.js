import Vue from "vue";
import axios from "axios";

import App from "./App";
import router from "./router";
import store from "./store";

// user imports
import "highlight.js/styles/dracula.css";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import "katex/dist/katex.min.css";

// latex

// import VueSplit from "vue-split-panel";
// Vue.use(VueSplit);
Vue.use(Buefy);

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
