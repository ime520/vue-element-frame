import Vue from "vue";
import VueRouter from "vue-router";

import { getStorageItem } from "@/config/storage";
import { Message } from "element-ui";

// 处理重复导航时vueRouter报错问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

Vue.use(VueRouter);

// notAuth标志页面无需控制访问，不登录也可以访问
// 以下是几种特殊路由：直接在这里定义，其他的都应抽取成单独文件
// 路由定义文件中，存在两种主布局：
// 主布局：固定1200px宽
// 主布局：宽度占满

const errRouter = [
  {
    path: "*",
    name: "pageNotFound",
    meta: { notAuth: true },
    component: () => import("../layouts/404.vue")
  }
];

const routes = [];

const router = new VueRouter({
  routes,
  // 定义滚动行为：模拟锚点、浏览器前进/后退、一般加载 这个的优先级高于路由导航守卫，因为会在路由钩子后面执行
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      // 情况一：浏览器前进、后退，记忆位置
      return savedPosition;
    } else {
      // 情况二：编程式导航：即根据路由query参数中的top决定，这里没有采用官方的锚点方案，原因是锚点在hash模式下定位不准确，体验不好
      if (to.query.top) {
        return { x: 0, y: to.query.top };
      }
      // 情况三：路由配置指定距离顶部的距离:子组件优先
      let matchedArr = to.matched;
      let customTop;
      for (let len = matchedArr.length, i = len - 1; i >= 0; i--) {
        const top = matchedArr[i].meta.scrollTop;
        if (top !== undefined) {
          customTop = top;
          break;
        }
      }
      if (customTop !== undefined) {
        return { x: 0, y: customTop };
      }
      // 情况四：默认置顶
      return {
        x: 0,
        y: 0
      };
    }
  }
});

router.beforeEach((to, from, next) => {
  // 需要前端控制访问权限：
  // (1)此处拦截是第一道坎，requireAuth为false，则代表不需要考虑是否登录
  //（2）第二道坎：放行后根据浏览器缓存判断是否登录，未登录跳转到登录
  // (3)第三道坎：跳转到页面，通过ajax请求由后端验证，若token过期则由axios拦截跳转到登录
  const requireAuth = !to.matched.some(record => record.meta.notAuth);
  if (requireAuth) {
    const token = getStorageItem("cccccc");
    if (token) {
      next();
    } else {
      Message({ type: "error", message: "请先登录！" });
      next({
        name: "login"
      });
    }
  } else {
    next();
  }
});

export default router;
