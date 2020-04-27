export default {
  data() {
    return {};
  },
  methods: {
    // 加载脚本
    loadScript(src, scriptId, paramsObj) {
      return new Promise(resolve => {
        const ezistNode = document.getElementById(scriptId);
        if (ezistNode) {
          resolve();
          return;
        }
        const body = document.body;
        const script = document.createElement("script");
        // 固定添加时间戳
        let totalSrc = src + `?timestap=${new Date().getTime()}`;
        if (paramsObj) {
          for (let key in paramsObj) {
            totalSrc += `&${key}=${paramsObj[key]}&`;
          }
        }
        script.src = totalSrc;
        script.id = scriptId;
        script.addEventListener("load", function() {
          resolve();
        });
        body.appendChild(script);
      });
    },
    // 移出脚本
    removeScript(scriptId) {
      const node = document.getElementById(scriptId);
      const body = document.body;
      node && body.removeChild(node);
    }
  }
};
