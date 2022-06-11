import { createRouter, createWebHashHistory } from 'vue-router'
const Layout = () => import('@/views/Layout')

const Home = () => import('@/views/home/index')

//商品分类
const TopCategory = () => import('@/views/category/index.vue')
const SubCategory = () => import('@/views/category/sub.vue')

const routes = [
  //一级路由布局容器
  {
    path: '/',
    component: Layout,
    children: [
      { path: '/', component: Home },
      { path: '/category/:id', component: TopCategory },
      { path: '/category/sub/:id', component: SubCategory }
    ]
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
