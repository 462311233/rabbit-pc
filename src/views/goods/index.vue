<template>
  <div class="xtx-goods-page" v-if="goods">
    <div class="container">
      <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem :to="'/category/' + goods.categories[1].id">{{
          goods.categories[1].name
        }}</XtxBreadItem>
        <XtxBreadItem :to="'/category/sub/' + goods.categories[0].id">{{
          goods.categories[0].name
        }}</XtxBreadItem>
        <XtxBreadItem>{{ goods.name }}</XtxBreadItem>
      </XtxBread>
      <!-- 商品信息 -->
      <div class="goods-info">
        <div class="media">
          <GoodsImages :images="goods.mainPictures"></GoodsImages>
          <GoodsSales></GoodsSales>
        </div>
        <div class="spec">
          <!-- //商品信息 -->
          <GoodsName :goods="goods"></GoodsName>
          <!-- 商品sku -->
          <GoodsSku :goods="goods" @change="changeSku"></GoodsSku>
          <!-- 商品计数 -->
          <xtx-numbox v-model="count" :max="goods.inventory"></xtx-numbox>
          <!-- 按钮 -->
          <xtx-button type="primary" style="margin-top: 10px">
            加入购物车
          </xtx-button>
        </div>
      </div>
      <!-- 商品推荐 -->
      <GoodsRelevant :goodsId="goods.id" />
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <div class="goods-tabs">
            <GoodsTabs></GoodsTabs>
          </div>
          <!-- 注意事项 -->
          <div class="goods-warn">
            <GoodsWarn />
          </div>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside">
          <GoodsHot :type="1"></GoodsHot>
          <GoodsHot :type="2"></GoodsHot>
          <GoodsHot :type="3"></GoodsHot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GoodsImages from './components/goods-image.vue'
import GoodsRelevant from './components/goods-relevant'
import GoodsSales from './components/goods-sales.vue'
import GoodsName from './components/goods-name.vue'
import GoodsSku from './components/goods-sku.vue'
import GoodsTabs from './components/goods-tabs.vue'
import GoodsHot from './components/goods-hot.vue'
import GoodsWarn from './components/goods-warn'
import { findGoods } from '@/api/product.js'
import { nextTick, provide, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import XtxButton from '@/components/library/xtx-button.vue'
export default {
  name: 'XtxGoodsPage',
  components: {
    GoodsRelevant,
    GoodsImages,
    GoodsSales,
    GoodsName,
    GoodsSku,
    XtxButton,
    GoodsTabs,
    GoodsHot,
    GoodsWarn
  },
  setup() {
    const goods = useGoods()
    // sku改变时候触发
    const changeSku = (sku) => {
      if (sku.skuId) {
        goods.value.price = sku.price
        goods.value.oldPrice = sku.oldPrice
        goods.value.inventory = sku.inventory
      }
    }
    const count = ref(1)
    //给后代组件发送数据
    provide('goods', goods)
    return {
      count,
      goods,
      changeSku
    }
  }
}
//////////////获取商品详情//////////////////
const useGoods = () => {
  const route = useRoute()
  const goods = ref(null)
  //防止路由地址变化组件不刷新
  watch(
    () => route.params.id,
    (newVal) => {
      //当路由地址是商品详情才会触发
      if (newVal && '/product/' + newVal === route.path) {
        findGoods(route.params.id).then((data) => {
          //数据清空，此时v-if就会清空dom
          goods.value = null
          //等页面dom消失后再加载数据
          nextTick(() => {
            goods.value = data.result
          })
        })
      }
    },
    { immediate: true }
  )

  return goods
}
</script>

<style scoped lang="less">
.goods-info {
  min-height: 600px;
  background: #fff;
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
.goods-tabs {
  min-height: 600px;
  background: #fff;
}
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
</style>
