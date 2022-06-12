<template>
  <div class="home-banner">
    <!-- 传给组件自定义属性，防止轮播图组件不可复用 -->
    <XtxCarousel :sliders="sliders" autoPlay></XtxCarousel>
  </div>
</template>

<script>
import { ref } from 'vue-demi'
import { findBanner } from '@/api/home.js'
export default {
  name: 'HomeBanner',
  setup() {
    //获取轮播图数据
    const sliders = ref([])
    //调用轮播图数据获取接口
    findBanner().then((data) => {
      sliders.value = data.result
    })
    return {
      sliders
    }
  }
}
</script>
<style scoped lang="less">
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
}

//覆盖轮播图样式按钮位置
.xtx-carousel {
  ::v-deep .carousel-btn.prev {
    left: 270px;
  }
  ::v-deep .carousel-indicator {
    padding-left: 250px;
  }
}
</style>
