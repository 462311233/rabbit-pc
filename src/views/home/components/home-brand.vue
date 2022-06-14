<template>
  <HomePanel title="热门品牌" sub-title="国际经典 品质保证">
    <!-- 左右切换键 -->
    <template v-slot:right>
      <a
        @click="toggle(-1)"
        href="javascript:;"
        class="iconfont icon-angle-left prev"
        :class="{ disabled: index === 0 }"
      ></a>
      <a
        @click="toggle(1)"
        href="javascript:;"
        class="iconfont icon-angle-right next"
        :class="{ disabled: index === 1 }"
      ></a>
    </template>
    <!-- //品牌内容 -->
    <div class="box" ref="box">
      <ul class="list" :style="{ transform: `translateX(${-index * 1240}px)` }">
        <li v-for="item in brands" :key="item.id">
          <RouterLink to="/">
            <img :src="item.picture" alt="" />
          </RouterLink>
        </li>
      </ul>
    </div>
  </HomePanel>
</template>

<script>
import { ref } from 'vue'
import { findBrand } from '@/api/home'
import HomePanel from './home-panel'
export default {
  name: 'HomeBrand',
  components: { HomePanel },
  setup() {
    //获取数据
    const brands = ref([])
    findBrand(10).then((data) => {
      brands.value = data.result
    })
    //左右切换
    const index = ref(0)
    const toggle = (step) => {
      const newValue = index.value + step
      index.value += step
      if (index.value > 1 || index.value < 0) return
      index.value = newValue
    }
    return { brands, index, toggle }
  }
}
</script>

<style scoped lang="less">
.home-panel {
  background: #f5f5f5;
}
.iconfont {
  width: 20px;
  height: 20px;
  background: #ccc;
  color: #fff;
  display: inline-block;
  text-align: center;
  margin-left: 5px;
  background: @xtxColor;
  &::before {
    font-size: 12px;
    position: relative;
    top: -2px;
  }
  &.disabled {
    background: #ccc;
    cursor: not-allowed;
  }
}
.box {
  display: flex;
  width: 100%;
  height: 345px;
  overflow: hidden;
  padding-bottom: 40px;

  .list {
    width: 200%;
    display: flex;
    transition: all 1s;
    li {
      margin-right: 10px;
      width: 240px;
      &:nth-child(5n) {
        margin-right: 0;
      }
      img {
        width: 240px;
        height: 305px;
      }
    }
  }
}
</style>
