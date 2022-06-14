<template>
  <!-- Banner -->
  <div class="home-entry">
    <div class="container">
      <!-- 左侧bar -->
      <HomeCategory />
      <!-- 轮播图 -->
      <HomeBanner></HomeBanner>
    </div>
  </div>
  <!-- 新品 -->
  <HomeNew></HomeNew>
  <!-- 推荐 -->
  <HomeHot></HomeHot>
  <!-- 热门 -->
  <HomeBrand></HomeBrand>
  <!-- 区块 -->
  <HomeProduct></HomeProduct>
  <!-- 专题 -->
  <HomeSpecial></HomeSpecial>
</template>

<script>
import HomeCategory from './components/home-category'
import HomeBanner from './components/home-banner'
import HomeNew from '@/views/home/components/home-new.vue'
import HomeHot from '@/views/home/components/home-hot.vue'
import HomeBrand from '@/views/home/components/home-brand.vue'
import HomeProduct from '@/views/home/components/home-product.vue'
import HomeSpecial from '@/views/home/components/home-special.vue'
export default {
  name: 'Home',
  components: {
    HomeCategory,
    HomeBanner,
    HomeNew,
    HomeHot,
    HomeBrand,
    HomeProduct,
    HomeSpecial
  }
}
</script>

<style lang="less" scoped></style>
