<template>
  <home-panel title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
    <template #right>
      <xtx-more path="/"></xtx-more>
    </template>
    <!-- 楼层内容 默认插槽 --->
    <ul class="goods-list" v-if="goods.length">
      <li v-for="item in goods" :key="item.id">
        <RouterLink :to="`/product/${item.id}`">
          <img :src="item.picture" alt="" />
          <p class="name ellipsis">{{ item.name }}</p>
          <p class="price">&yen;{{ item.price }}</p>
        </RouterLink>
      </li>
    </ul>
    <HomeSkeleton v-else></HomeSkeleton>
  </home-panel>
</template>

<script>
import HomePanel from '@/views/home/components/home-panel.vue'
import HomeSkeleton from './home-skeleton.vue'
import { ref } from 'vue-demi'
import { findNew } from '@/api/home'
export default {
  name: 'HomeNew',
  components: {
    HomePanel,
    HomeSkeleton
  },
  setup() {
    //获取商品数据
    const goods = ref([])
    findNew().then((data) => {
      goods.value = data.result
    })
    return {
      goods
    }
  }
}
</script>
<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }
    .price {
      color: @priceColor;
    }
  }
}
</style>
