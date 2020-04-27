import Vue from "vue";
import App from "./App.vue";
// 引入插件
import "./plugins/element.js";
import "./plugins/svg.js";
import "./plugins/packs";
// 引入过滤器
import "./filters";
// 引入路由
import router from "./routers/index";
import store from "./vuex/index";
// 分别引入样式，避免合并一个文件引入编译很慢
import "element-ui/packages/theme-chalk/src/index.scss";
import "./styles/reset.scss";
import "./styles/class.scss";
import "./styles/custom.scss";
import "./assets/scss/_sprite.scss";
// 引入axios
import axios from "./config/axios";
// 引入api
import api from "./api";

// 挂在到原型上
Vue.prototype.axios = axios.instance; // 本系统的后端接口
Vue.prototype.$axios = axios.editorInstance; // 编辑器的接口
Vue.prototype.api = api;

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
  store
}).$mount("#app");
