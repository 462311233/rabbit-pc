import request from '@/utils/request.js'

//获取所有分类,拿到一级二级和对应商品的数据覆盖初始数据
export const findAllCategory = () => {
  return request('/home/category/head', 'get')
}
//获取一级类目
export const findTopCategory = (id) => {
  return request('/category', 'get', { id })
}
//获取二级类目的筛选数据
export const findSubCategoryFilter = (id) => {
  return request('/category/sub/filter', 'get', { id })
}
//获取分类中的商品
export const findSubCategoryGoods = (params) => {
  return request('/category/goods/temporary', 'post', params)
}
