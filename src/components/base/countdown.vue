<template>
  <el-button type="text" @click="handleClick" :disabled="isCountdown">{{
    showText
  }}</el-button>
</template>

<script>
export default {
  name: "",
  components: {},
  props: {
    text: {
      type: String,
      default: "获取验证码"
    },
    start: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  data() {
    return {
      isCountdown: false,
      time: 60
    };
  },
  methods: {
    handleClick() {
      if (!this.isCountdown) {
        this.$emit("click");
      }
    },
    startCountdown() {
      this.isCountdown = true;
      const timer = setInterval(() => {
        if (this.time >= 1) {
          this.time--;
        } else {
          clearInterval(timer);
          this.time = 60;
          this.isCountdown = false;
          this.$emit("update:start", false);
        }
      }, 1000);
    }
  },
  computed: {
    showText() {
      return this.isCountdown ? this.time + "s" : this.text;
    }
  },
  watch: {
    start(newVal) {
      newVal && this.startCountdown();
    }
  }
};
</script>

<style lang="scss" scoped>
.el-button {
  @include font($c: #fff);
}
</style>
