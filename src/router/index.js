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
  routes,
  //切换路由时页面回到顶部
  scrollBehavior() {
    //vue2.0
    // return { x: 0, y: 0 }
    //vue3.0
    return { left: 0, top: 0 }
  }
})

export default router
