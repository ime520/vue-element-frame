import { setStorageItem } from "@/config/storage";

export default {
  methods: {
    submitLogin(obj) {
      this.startButtonLoading(1);
      this.axios
        .post(this.api.login, obj)
        .then(userInfo => {
          this.stopButtonLoading(1);
          this.setVuexUser(userInfo);
          setStorageItem("cuidctoken", userInfo.token);
          setStorageItem("cuidcuserId", userInfo.userId);
          this.$message.success("登录成功！");
          this.$router.push({ name: "signupInfo" });
        })
        .catch(() => {
          this.stopButtonLoading(1);
        });
    }
  }
};
