// 所有常量都要放置于此文件中，以便各模块通用，否则在各文件中各自为政，将导致难以维护，不知道各个取值代表的含义,
// 参赛赛区
// number：显示时的编号
// name：显示时的文字
// val：与后端交互时的值
// number和val可能相同，也可能不同
export default {
  competionAreaList: [],
  // 公共函数，由val找对应项，如果是找name则建议在过滤器中再次封装一下实现复用
  getItemByVal(listName, val) {
    return this[listName].find(item => item.val === val) || {};
  },
  // 用于视图中条件判断，后端返回的字段是val
  getItemValByName(listName, name) {
    return (this[listName].find(item => item.name === name) || {}).val;
  }
};
