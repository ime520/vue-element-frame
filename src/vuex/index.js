import Vue from "vue";
import Vuex from "vuex";
import { getStorageItem } from "@/config/storage";
import constants from "@/constants/common";
import { Message } from "element-ui";
import router from "@/routers";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    userInfo: {
      token: getStorageItem("cuidctoken"),
      userId: getStorageItem("cuidcuserId")
    }
  },
  getters: {
    token: state => {
      return state.userInfo.token;
    },
    userId: state => {
      return state.userInfo.userId;
    },
    isLogin: state => {
      return !!(state.userInfo.token && state.userInfo.userId);
    }
  },
  mutations: {
    setUserInfo(state, obj) {
      state.userInfo = { ...obj };
    },
    // 判断是否超出限制
    judgeSignupExceeding(state, array) {
      const filteredArr = array.filter(item => {
        return (
          item.freeze === constants.getItemValByName("accountStateList", "正常")
        );
      });
      const count = filteredArr.length;
      if (count >= 6) {
        Message.error("您的报名次数超过限制！");
      } else {
        router.push({ name: "signupFill" });
      }
    }
  },
  actions: {}
});

export default store;
