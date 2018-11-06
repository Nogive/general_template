// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import App from "./App";
import router from "./router";

import Utils from "./utils";
Vue.prototype.Utils = Utils;

import constants from "./common/js/constant";
Vue.prototype.constants = constants;

import axios from "axios";
import qs from "qs";

Vue.prototype.$qs = qs;
Vue.prototype.axios = axios;

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
