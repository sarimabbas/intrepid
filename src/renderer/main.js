import Vue from "vue";
import axios from "axios";

import App from "./App";
import router from "./router";
import store from "./store";

// user imports
import "highlight.js/styles/dracula.css";
import Buefy from "buefy";
import "buefy/dist/buefy.css";

// latex
import VueKatex from "vue-katex";
import "katex/dist/katex.min.css";

// import VueSplit from "vue-split-panel";

// use
// Vue.use(VueSplit);
Vue.use(Buefy);
Vue.use(VueKatex);
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
