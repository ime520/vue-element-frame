import axios from "axios";
import { Message } from "element-ui";
import { getStorageItem, removeStorageItem } from "@/config/storage";
import router from "@/routers";

// 配置实例1：api接口地址
var instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 10000
});

// 配置实例2：编辑器接口地址
var editorInstance = axios.create({
  baseURL: process.env.VUE_APP_BASE_EDITOR_URL,
  timeout: 10000
});

// 请求拦截器
function handleReqSuc(config) {
  config.headers.Authorization = getStorageItem("cuidctoken");
  return config;
}
// 编辑器请求拦截器
function handleEditorReqSuc(config) {
  config.headers.token = getStorageItem("cuidctoken");
  return config;
}
// 对响应数据做点什么
function handleResSuccess(response) {
  // 专心返回data里面的数据，不关心外层
  const {
    data: { data: sucRes }
  } = response;
  return sucRes;
}
// 对响应错误做点什么
function handleResError(error) {
  const { data: errRes, status } = error.response;
  Message({ type: "error", message: errRes.ret_desc });
  //对一些特殊错误码做特殊处理
  switch (status) {
    case 400:
      break;
    case 405:
      removeStorageItem("cuidctoken");
      router.push({ name: "login" });
      break;
    case 500:
      break;
  }
  // 这样才能被catch捕获到
  const promise = Promise.reject(errRes);
  return promise;
}

// 编辑器接口响应成功做点什么
function handleEditorResSuc(response) {
  // 专心返回data里面的数据，不关心外层
  const { data } = response;
  return data;
}
// 编辑器接口响应错误做点什么
function handleEdiotrResError(error) {
  const { data: errRes, status } = error.response;
  Message({ type: "error", message: errRes.error });
  //对一些特殊错误码做特殊处理
  switch (status) {
    case 400:
      break;
    case 401:
      removeStorageItem("cuidctoken");
      router.push({ name: "login" });
      break;
    case 500:
      break;
  }
  // 这样才能被catch捕获到
  const promise = Promise.reject(errRes);
  return promise;
}

// 请求拦截器
instance.interceptors.request.use(handleReqSuc);
editorInstance.interceptors.request.use(handleEditorReqSuc);
// 响应拦截器
instance.interceptors.response.use(handleResSuccess, handleResError);
editorInstance.interceptors.response.use(
  handleEditorResSuc,
  handleEdiotrResError
);

export default { instance, editorInstance };
