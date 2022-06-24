//用户数据接口
import request from '@/utils/request.js'

//登录接口上传帐号密码
export const userAccountLogin = (account, password) => {
  return request('/login', 'post', { account, password })
}

//手机验证码登录接口
export const userMobileLoginMsg = (mobile) => {
  return request('/login/code', 'get', { mobile })
}

//登录接口上传手机号和验证码
export const userMobileLogin = ({ mobile, code }) => {
  return request('/login/code', 'get', { mobile, code })
}
