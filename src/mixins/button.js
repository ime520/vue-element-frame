import { throttle } from "@/config/tool";

export default {
  data() {
    return {
      // 可以控制三个按钮，应该够用了
      btnLoading1: false,
      btnLoading2: false,
      btnLoading3: false
    };
  },
  methods: {
    startButtonLoading(btnIndex) {
      this.$set(this, `btnLoading${btnIndex}`, true);
    },
    stopButtonLoading(btnIndex) {
      this.$set(this, `btnLoading${btnIndex}`, false);
    },
    handleThrottle(method, time, context) {
      throttle(method, time, context);
    }
  }
};
