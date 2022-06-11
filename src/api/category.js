//二级分类请求接口
import request from '@/utils/request.js'

//获取所有分类,拿到一级二级和对应商品的数据
export const findAllCategory = () => request('/home/category/head', 'get')
