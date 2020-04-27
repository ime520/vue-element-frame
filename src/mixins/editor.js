export default {
  data() {
    return {};
  },
  methods: {
    // 初始化编辑器：编辑和查看
    async initEditor(isShow, projectId, userId, token, dom = null) {
      const ddd = isShow ? window.dddEngine : window.dddEditor;
      let data = {
        projectId,
        userId,
        token,
        dom //页面dom节点，如果未传入，则会查找id为app的节点
      };
      //初始化引擎
      await ddd.initialize(data);
      // 初始化引擎后截取封面
      this.screenshot && ddd.captureMainInstance();
      // 初始化引擎后定义退出操作
      this.onEditorExit &&
        ddd.bus.on(["editor", "system", "quit"], this.onEditorExit);
    }
  }
};
