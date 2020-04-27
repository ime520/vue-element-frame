import { Message } from "element-ui";

// 按理应设计成单例模式
// 节流函数，此处参考js高级程序设计
export function throttle(method, time, context) {
  clearTimeout(method.tId);
  method.tId = setTimeout(() => {
    method.call(context);
  }, time);
}
//--------------------分割线-------------------------

// 以下几个函数使用场景：前端需要按数组进行交互，后端的该字段需要字符串，因此
// 需要进行转换

// 字符串转换成数组

export function strToArr(str) {
  if (str === "") {
    return [];
  }
  const newStr = str.substr(0, str.lastIndexOf(","));
  return newStr.split(",");
}

// 数组转换成字符串

export function arrToStr(arr) {
  return arr.join(",") + ",";
}

// 给字符串增加一项

export function addItemToStr(arr, strItem) {
  const array = [...arr];
  const has = arr.indexOf(strItem) !== -1;
  if (has) {
    Message({ type: "error", message: "已经有该标签了，请重新输入！" });
    return arrToStr(array);
  } else {
    array.push(strItem);
    return arrToStr(array);
  }
}

// 给字符串删除一项

export function delItemFromStr(str, strItem) {
  return str.replace(`${strItem},`, "");
}
//--------------------分割线-------------------------

// 后端接口需要的是秒，但是elementUI需要的是毫秒
// 将对象的时间由秒改为毫秒

export function transObjTime(obj, key) {
  const o = { ...obj };
  o[key] /= 1000;
  return o;
}

// 将对象的时间由毫秒改为秒

export function restoreObjTime(obj, key) {
  const o = { ...obj };
  o[key] *= 1000;
  return o;
}

// 不足10补齐两位
export function makeup2bit(num) {
  if (num < 10) {
    return "0" + num;
  } else {
    return num;
  }
}
// 截取部分字段,类似于lodash的pick

export function pickBy(obj, arr) {
  const o = {};
  arr.forEach(key => {
    o[key] = obj[key];
  });
  return o;
}

// 下载图片
export function downloadImage(url, filename) {
  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext("2d");
  let img = new Image();
  img.crossOrigin = "Anonymous";
  img.onload = function() {
    canvas.height = img.height;
    canvas.width = img.width;
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    let a = document.createElement("a");
    a.href = dataURL;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      canvas = null;
    }, 1000);
  };
  img.src = url;
}
// 下载canvas生成的图片
export function downloadCanvas(canvas, filename) {
  var pageData = canvas.toDataURL("image/jpeg", 1.0);
  let a = document.createElement("a");
  a.href = pageData;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    canvas = null;
  }, 1000);
}
