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
  <!--  -->
  <HomeBrand></HomeBrand>
</template>

<script>
import HomeCategory from './components/home-category'
import HomeBanner from './components/home-banner'
import HomeNew from '@/views/home/components/home-new.vue'
import HomeHot from '@/views/home/components/home-hot.vue'
import HomeBrand from '@/views/home/components/home-brand.vue'
export default {
  name: 'Home',
  components: { HomeCategory, HomeBanner, HomeNew, HomeHot, HomeBrand }
}
</script>

<style lang="less" scoped></style>
