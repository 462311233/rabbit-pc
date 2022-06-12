import request from '@/utils/request.js'
//品牌分类接口，个数6个
export const findBrand = (limit = 6) => {
  return request('/home/brand', 'get', { limit })
}
