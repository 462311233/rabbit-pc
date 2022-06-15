<template>
  <div class="container">
    <!-- 面包屑 -->
    <XtxBread>
      <XtxBreadItem to="/">首页</XtxBreadItem>
      <XtxBreadItem to="/category/1005000">电器</XtxBreadItem>
      <XtxBreadItem>空调</XtxBreadItem>
    </XtxBread>
    <!--  -->
    <!--  -->
    <!--  -->
  </div>
</template>

<script>
import xtxBread from '@/components/library/xtx-bread.vue'
import XtxBreadItem from '@/components/library/xtx-bread-item.vue'
export default {
  components: { xtxBread, XtxBreadItem },
  name: ''
}
</script>
<style scoped lang="less"></style>
