//商品详情api
import request from '@/utils/request.js'
export const findGoods = (id) => {
  return request('/goods', 'get', { id })
}
