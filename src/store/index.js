import { createStore } from 'vuex'
//导入持久化插件
import createPersistedstate from 'vuex-persistedstate'

import cart from './modules/cart.js'
import user from './modules/user.js'
import category from './modules/category.js'

export default createStore({
  modules: {
    cart,
    user,
    category
  },
  //配置vuex插件
  plugins: [
    // 默认是存储在localStorage中
    createPersistedstate({
      //设置本地存储key的名字
      key: 'rabbit-store',
      //指定需要存储的store模块
      paths: ['user', 'cart']
    })
  ]
})
