import request from '@/utils/request.js'

//获取所有分类,拿到一级二级和对应商品的数据覆盖初始数据
export const findAllCategory = () => {
  return request('/home/category/head', 'get')
}
//获取一级类目
export const findTopCategory = (id) => {
  return request('/category', 'get', { id })
}
