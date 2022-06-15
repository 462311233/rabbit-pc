<template>
  <div class="top-category">
    <div class="container">
      <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem to="/category/1005000" v-if="topCategory">{{
          topCategory.name
        }}</XtxBreadItem>
      </XtxBread>
      <!-- 轮播图 -->
      <XtxCarousel :sliders="sliders" autoPlay style="height: 500px" />
      <!-- 当前分类的二级分类 -->
      <div class="sub-list" v-if="topCategory">
        <h3>全部分类</h3>
        <ul>
          <li v-for="i in topCategory.children" :key="i.id">
            <a href="javascript:;">
              <img :src="i.picture" alt="" />
              <p>{{ i.name }}</p>
            </a>
          </li>
        </ul>
      </div>
      <!--分类  -->
      <div class="ref-goods" v-for="sub in subList" :key="sub.id">
        <div class="head">
          <h3>- {{ sub.name }} -</h3>
          <p class="tag">温暖柔软，品质之选</p>
          <XtxMore :path="`/category/sub/${sub.id}`" />
        </div>
        <div class="body">
          <GoodsItem
            v-for="goods in sub.goods"
            :key="goods.id"
            :goods="goods"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import xtxBread from '@/components/library/xtx-bread.vue'
import XtxBreadItem from '@/components/library/xtx-bread-item.vue'
import GoodsItem from './components/goods-item'
import { findBanner } from '@/api/home.js'
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { findTopCategory } from '@/api/category'
export default {
  components: { xtxBread, XtxBreadItem, GoodsItem },
  name: 'TopCategory',
  setup() {
    //获取轮播图数据
    const sliders = ref([])
    //调用轮播图数据获取接口
    findBanner().then((data) => {
      sliders.value = data.result
    })
    //面包屑+子分类数据
    const store = useStore()
    const route = useRoute()
    const topCategory = computed(() => {
      //当前路由地址和分类数据
      return store.state.category.list.find((item) => {
        return item.id === route.params.id
      })
    })
    //获取子类目数据
    const subList = ref([])
    const getSubList = () => {
      findTopCategory(route.params.id).then((data) => {
        subList.value = data.result.children
      })
    }
    //当路径id发生变化时需要重新获取数据，因为同一路由规则不会刷新数据
    watch(
      () => route.params.id,
      (newVal) => {
        if (newVal) {
          getSubList()
        }
      },
      { immediate: true }
    )

    return {
      sliders,
      topCategory,
      subList
    }
  }
}
</script>
<style scoped lang="less">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;
    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }
      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }
    .body {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 0 65px 30px;
    }
  }
}
</style>
