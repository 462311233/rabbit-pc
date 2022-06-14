//首页的接口封装
import request from '@/utils/request.js'
//品牌分类接口，个数6个
export const findBrand = (limit = 6) => {
  return request('/home/brand', 'get', { limit })
}
//轮播图数据接口
export const findBanner = () => {
  return request('/home/banner', 'get')
}
//新鲜好物接口
export const findNew = () => {
  return request('home/new', 'get')
}
//人气推荐接口
export const findHot = () => {
  return request('home/hot', 'get')
}
//商品板块接口
export const findGoods = () => {
  return request('home/goods', 'get')
}
//最新专题接口
export const findSpecial = () => {
  return request('home/special', 'get')
}
