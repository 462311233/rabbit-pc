//显示消息提示框的函数,方便组件调用

//导入消息提示组件和创建虚拟节点方法
import { createVNode, render } from 'vue'
import XtxMessage from './xtx-message.vue'

//准备一个装载容器存放虚拟节点
const div = document.createElement('div')
div.setAttribute('class', 'xtx-msgContainer')
document.body.appendChild(div)
// 定时器标识
let timer = null
export default ({ type, text }) => {
  //将消息组件转换为虚拟节点
  const vnode = createVNode(XtxMessage, { type, text })
  // 将节点渲染到容器内
  render(vnode, div)
  // 5. 开启定时，移出DOM容器内容
  clearTimeout(timer)
  timer = setTimeout(() => {
    render(null, div)
  }, 3000)
}
