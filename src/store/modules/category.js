//商品分类
import { topCategory } from '@/api/constants.js'
import { findAllCategory } from '@/api/category.js'
export default {
  namespaced: true,
  state() {
    return {
      //依赖分类数据渲染结构,通过topCategory默认数据初始化,不需要等待接口请求渲染一级分类
      list: topCategory.map((item) => ({ name: item })) //设置键名name
    }
  },
  mutations: {
    //修改分类数据
    setList(state, listInfo) {
      state.list = listInfo
    },
    //控制二级菜单显示隐藏
    show(state, id) {
      const currentCategory = state.list.find((item) => item.id === id)
      currentCategory.open = true
    },
    hide(state, id) {
      const currentCategory = state.list.find((item) => item.id === id)
      currentCategory.open = false
    }
  },
  //异步请求获取所有分类
  actions: {
    async getList({ commit }) {
      //获取
      const data = await findAllCategory()
      //给每个一级类目添加布尔值控制二级菜单的显示和隐藏
      data.result.forEach((item) => {
        item.open = false
      })
      //修改数据
      commit('setList', data.result)
    }
  }
}
