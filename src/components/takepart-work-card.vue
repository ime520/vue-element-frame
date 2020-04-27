<template>
  <div class="work-card">
    <div class="work-card-img">
      <img :src="data.project.cover" alt="" />
      <div class="work-card-img-mask">
        <svg-icon
          icon="card-search"
          @click.native="showModel(data.project.guid, data.project.name)"
        ></svg-icon>
      </div>
      <div class="work-card-img-btn" @click="gotoEdit(data.project.guid)">
        <svg-icon icon="edit"></svg-icon>
        3D编辑
      </div>
    </div>
    <div class="work-card-info">
      <div class="work-card-info-name">
        <div class="title">作品名称：</div>
        <div class="val">{{ data.project.name }}</div>
      </div>
      <div class="work-card-info-time">
        <div class="title">提交时间：</div>
        <div class="val">{{ data.project.updatedAt | timeFormat("s") }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  props: {
    data: {
      type: Object,
      default() {
        return {
          project: {}
        };
      }
    },
    // 展示逻辑不写在卡片内部是因为如果遍历，就会生成多个弹窗，加载多个脚本，初始化多个编辑器，因此应始终只保持一个编辑器弹窗
    showModel: {
      type: Function
    }
  },
  data() {
    return {};
  },
  methods: {
    // 去编辑
    gotoEdit(guid) {
      this.$router.push({
        name: "editorEdit",
        params: { projectId: guid }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.work-card {
  @include margin($ml: 30px, $mb: 30px);
  @include box($w: 380px, $h: 275px, $o: hidden);
  @include border($b: 1px solid $border-color-main, $bra: 4px);
  @include bg($c: #fff);
  @include other($c: pointer);
  &-img {
    @include box($p: relative, $h: 215px);
    img {
      @include box($d: block, $h: 100%, $w: 100%);
    }
    &-mask {
      @include flex($h: center, $w: center);
      @include box($d: none, $h: 100%, $w: 100%);
      @include pos($p: absolute, $t: 0, $l: 0);
      @include bg($c: $bg-color-mask);
      @include border($bra: 4px 4px 0px 0px);
      svg {
        @include font($s: 50px);
      }
    }
    &-btn {
      @include flex($v: center);
      @include box($w: 90px, $h: 30px);
      @include pos($p: absolute, $r: 10px, $t: 175px, $z: 2);
      @include font($lh: 30px);
      @include border($bra: 53px, $bsd: 0px 0px 4px rgba(0, 0, 0, 0.25));
      @include bg($c: #fff);
      svg {
        @include margin($m: 0 2px 0 7px);
        @include font($s: 26px);
      }
    }
    &:hover {
      .work-card-img-mask {
        @include flex($v: center, $w: center);
      }
    }
  }
  &-info {
    @include padding($p: 10px 20px);
    &-name,
    &-time {
      @include box($d: flex, $h: 20px);
      @include font($lh: 20px);
      .title {
        @include font($s: 14px, $c: $color-main-6);
      }
      .val {
        @include font($s: 14px, $c: $color-main);
      }
    }
  }
}
</style>
