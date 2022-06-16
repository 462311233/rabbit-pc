<template>
  <XtxBread>
    <XtxBreadItem to="/">首页</XtxBreadItem>
    <XtxBreadItem :to="`/category/${category.top.id}`" v-if="category.top">{{
      category.top.name
    }}</XtxBreadItem>
    <transition name="fade-right" mode="out-in">
      <XtxBreadItem v-if="category.sub" :key="category.sub.id">{{
        category.sub.name
      }}</XtxBreadItem>
    </transition>
  </XtxBread>
</template>

<script>
import { computed } from 'vue-demi'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
export default {
  name: 'SubBread',
  setup() {
    //通过计算属性从vuex中获取一级和二级类目
    const store = useStore()
    const route = useRoute()
    const category = computed(() => {
      //创建当前分类
      const cate = {}
      //遍历vuex中所有一级分类
      store.state.category.list.forEach((top) => {
        if (top.children) {
          //拿到与路由数据匹配的当前二级分类
          const sub = top.children.find((sub) => sub.id === route.params.id)
          if (sub) {
            cate.top = { id: top.id, name: top.name }
            cate.sub = { id: sub.id, name: sub.name }
          }
        }
      })
      return cate
    })
    return { category }
  }
}
</script>
<style scoped lang="less"></style>
