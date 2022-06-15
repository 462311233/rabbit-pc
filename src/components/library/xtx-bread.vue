<script>
import { h } from 'vue'
export default {
  name: 'XtxBread',
  render() {
    //获取默认插槽
    const items = this.$slots.default()
    //遍历插槽items给每个插槽后面加一个i标签 最后一个item不加i标签
    const dynamicItem = []
    items.forEach((item, index) => {
      dynamicItem.push(item)
      if (index < items.length - 1) {
        dynamicItem.push(h('i', { class: 'iconfont icon-angle-right' }))
      }
    })
    return h('div', { class: 'xtx-bread' }, dynamicItem)
  }
}
</script>

<style lang="less">
// 将样式作用于插槽组件
.xtx-bread {
  display: flex;
  padding: 25px 10px;
  &-item {
    a {
      color: #666;
      transition: all 0.4s;
      &:hover {
        color: @xtxColor;
      }
    }
  }

  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
  }
}
</style>
