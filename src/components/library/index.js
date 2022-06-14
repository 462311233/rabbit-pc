// 扩展vue原有的功能：全局组件，自定义指令，挂载原型方法，注意：没有全局过滤器。
// 这就是插件
// vue2.0插件写法要素：导出一个对象，有install函数，默认传入了Vue构造函数，Vue基础之上扩展
// vue3.0插件写法要素：导出一个对象，有install函数，默认传入了app应用实例，app基础之上扩展

import XtxSkeleton from './xtx-skeleton.vue'
import XtxCarousel from './xtx-carousel.vue'
import XtxMore from './xtx-more.vue'
export default {
  install(app) {
    // 在app上进行扩展，app提供 component directive 函数
    // 如果要挂载原型 app.config.globalProperties 方式
    app.component(XtxSkeleton.name, XtxSkeleton)
    app.component(XtxCarousel.name, XtxCarousel)
    app.component(XtxMore.name, XtxMore)
    //自定义指令
    defineDirective(app)
  }
}
//定义指令
const defineDirective = (app) => {
  //图片懒加载
  // 原理：当图片进入可视区域后再将src地址传给图片dom，
  // 地址存储在指令的value （v-lazy=“././asd.png”）
  app.directive('lazy', {
    //在dom加载好的阶段监听图片 binding是指令的value形参
    mounted(el, binding) {
      //创建观察对象 IntersectionObserver 是原生api监测元素进入可视区域
      const observe = new IntersectionObserver(
        ([{ isIntersecting }]) => {
          //判断图片是否进入
          if (isIntersecting) {
            //先停止对当前元素观察，避免后续重复观察
            observe.unobserve(el)
            //图片加载失败,设置一张默认图片
            // el.onerror = ()=>{
            //   el.src = 图片地址
            // }
            //将指令的值传给el的src属性
            el.src = binding.value
          }
        },
        {
          //threshold设置交叉比例
          threshold: 0
        }
      )
      //观察实例调用observe方法观察元素
      observe.observe(el)
    }
  })
}
