//用户信息模块
export default {
  namespaced: true,
  state() {
    return {
      profile: {
        id: '',
        avatar: '',
        nickname: '',
        account: '',
        mobile: '',
        token: ''
      }
    }
  }
}
