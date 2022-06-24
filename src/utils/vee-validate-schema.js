// 定义校验规则提供给vee-validate组件使用
export default {
  //用户名
  account(value) {
    if (!value) return '请输入用户名'
    //规则
    if (!/^[a-zA-Z]\w{4,15}$/.test(value)) return '格式为字母开头5-16个字符'
    return true
  },
  //密码
  password(value) {
    if (!value) return '请输入密码'
    //规则
    if (!/^\w{6,24}/.test(value)) return '格式为6-24个数字'
    return true
  },
  //手机号
  mobile(value) {
    if (!value) return '请输入手机号'
    //规则
    if (!/^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(value)) return '格式错误'
    return true
  },
  //验证码
  code(value) {
    if (!value) return '请输入短信验证码'
    //规则
    if (!/^\d{6}$/.test(value)) return '格式错误'
    return true
  },
  //勾选
  isAgree(value) {
    if (!value) return '请阅读并勾选登陆协议'
    return true
  }
}
