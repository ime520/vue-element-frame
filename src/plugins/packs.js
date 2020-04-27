// 其他小插件配置统一放这里
import Vue from "vue";
import VueLazyload from "vue-lazyload";

Vue.use(VueLazyload, {
  loading: require("@/assets/images/lazy-loading.svg"),
  // error: require("@/assets/images/default.svg"),
  attempt: 1
});
