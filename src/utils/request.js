import axios from 'axios'
//引入路由模块，获取组件地址实现页面跳转
import router from '@/router/index.js'
//导入vuex中的数据
import store from '@/store/index.js'
//向外导出基础域名，方便其他请求方式使用
export const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net/'
//配置axios
const instance = axios.create({
  baseURL,
  timeout: 5000
})

//配置请求拦截器 config对象是发送请求的配置内容
instance.interceptors.request.use(
  (config) => {
    //获取用户信息
    const { profile } = store.state.user
    //判断用户信息中是否有token
    if (profile.token) {
      //设置token
      config.headers.Authorization = 'Bearer' + profile.token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

//配置响应拦截器
instance.interceptors.response.use(
  //响应成功直接取出数据
  (res) => {
    res.data
  },
  //处理响应错误
  (error) => {
    //401 用户token过期或失效
    if (error.response.status === 401) {
      //1.清除用户过期数据
      store.commit('user/setUser', {})
      //2跳转到登陆页面
      //先拿到跳转from的路由地址（从哪个组件页面来的）需要对地址的查询参数转码不能存在两个等号
      const fullPath = encodeURIComponent(router.currentRoute.value.fullPath)
      //携带路由地址跳转，方便重新登陆后从哪来回哪去
      router.push('/login?redirectUrl=' + fullPath)
    }
    return Promise.reject(error)
  }
)

//导出请求函数
export default (url, method, submitData) => {
  //返回创建好的axios实例，将参数传入axios实例负责发送请求
  return instance({
    url,
    method,
    //根据请求方式判断发送的数据以什么键值储存（比如get携带参数为params，post携带参数为data）
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}
