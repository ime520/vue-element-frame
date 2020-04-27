<template>
  <el-pagination
    layout="total,prev,sizes,pager,next,jumper"
    :total="total"
    :current-page.sync="currentPage"
    @current-change="handleCurrentChange"
    @size-change="handleSizeChange"
  ></el-pagination>
</template>

<script>
export default {
  name: "",
  components: {},
  props: {
    current: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 0
    },
    refreshFunc: {
      type: Function
    }
  },
  data() {
    return {
      currentPage: 1
    };
  },
  methods: {
    // 页码改变
    handleCurrentChange(pageNum) {
      this.$emit("change", { pageNum: pageNum });
      this.refreshFunc && this.refreshFunc();
    },
    // 每页显示多少条改变
    handleSizeChange(pageSize) {
      this.currentPage = 1;
      this.$emit("change", { pageSize, pageNum: 1 });
      this.refreshFunc && this.refreshFunc();
    }
  },
  watch: {
    current(newVal) {
      this.currentPage = newVal;
    }
  }
};
</script>

<style lang="scss" scoped>
.el-pagination {
  @include margin($mt: 20px);
}
</style>
