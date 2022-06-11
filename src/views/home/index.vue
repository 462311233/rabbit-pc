<template>
  <div class="container">
    <!-- Banner -->
    <div class="home-entry">
      <!-- 左侧bar -->
      <HomeCategory />
      <!-- 轮播图 -->
    </div>
  </div>
</template>

<script>
import HomeCategory from './components/home-category'
export default {
  name: 'Home',
  components: { HomeCategory }
}
</script>

<style lang="less" scoped></style>
