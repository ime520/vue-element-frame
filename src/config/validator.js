// 重要方式：通过bind给这里面的函数传递参数 ==> this
// 校验手机号码
export function checkPhone(rule, value, callback) {
  const regexp = /^0?(1[3-9])[0-9]{9}$/;
  const bool = regexp.test(value);
  if (!bool) {
    const error = new Error("请输入正确的手机号");
    callback(error);
  } else {
    callback();
  }
}
// 校验确认密码
export function checkRepeatPwd(rule, value, callback) {
  const obj = this.data;
  const form = this.validFormName;
  const validKey = this.validKey;
  const v = form === null ? obj[validKey] : obj[form][validKey];
  if (value === v) {
    callback();
  } else {
    const error = new Error("两次输入的密码不一致");
    callback(error);
  }
}
// 校验是否勾选多选框
export function checkCheckbox(rule, value, callback) {
  if (value === true) {
    callback();
  } else {
    const error = new Error(this);
    callback(error);
  }
}

// 校验标签
export function checkTag(rule, value, callback) {
  if (value.length > 0) {
    callback();
  } else {
    const error = new Error(this);
    callback(error);
  }
}
