import Vue from "vue";
import constants from "@/constants/common";
import { makeup2bit } from "@/config/tool";

Vue.filter("raceType", value => {
  return constants.getItemByVal("competitionTypeList", value) || {};
});
Vue.filter("raceTypeName", value => {
  return (constants.getItemByVal("competitionTypeList", value) || {}).name;
});

Vue.filter("raceTrack", value => {
  return constants.getItemByVal("competionTrackList", value) || {};
});
Vue.filter("raceTrackName", value => {
  return (constants.getItemByVal("competionTrackList", value) || {}).name;
});

Vue.filter("raceArea", value => {
  return constants.getItemByVal("competionAreaList", value) || {};
});
Vue.filter("raceAreaName", value => {
  return (constants.getItemByVal("competionAreaList", value) || {}).name;
});

Vue.filter("timeFormat", (value, format) => {
  const dateObj = new Date(value * 1000); // 秒转为毫秒
  const year = dateObj.getFullYear(); //取得4位数的年份
  const month = dateObj.getMonth() + 1; //取得日期中的月份，其中0表示1月，11表示12月
  const date = dateObj.getDate(); //返回日期月份中的天数（1到31）
  const hour = dateObj.getHours(); //返回日期中的小时数（0到23）
  const minute = dateObj.getMinutes(); //返回日期中的分钟数（0到59）
  const second = dateObj.getSeconds();
  const M = year + "-" + makeup2bit(month);
  const D = M + "-" + makeup2bit(date);
  const h = makeup2bit(hour);
  const m = h + ":" + makeup2bit(minute);
  const s = m + ":" + makeup2bit(second);
  switch (format) {
    case "M":
      value = M;
      break;
    case "D":
      value = D;
      break;
    case "m":
      value = D + " " + m;
      break;
    case "s":
      value = D + " " + s;
      break;
  }
  return value;
});
