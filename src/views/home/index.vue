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
  <!--  -->
  <HomeNew></HomeNew>
  <!--  -->
  <HomeHot></HomeHot>
</template>

<script>
import HomeCategory from './components/home-category'
import HomeBanner from './components/home-banner'
import HomeNew from '@/views/home/components/home-new.vue'
import HomeHot from '@/views/home/components/home-hot.vue'
export default {
  name: 'Home',
  components: { HomeCategory, HomeBanner, HomeNew, HomeHot }
}
</script>

<style lang="less" scoped></style>
