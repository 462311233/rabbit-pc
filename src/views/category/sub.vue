<template>
  <div class="sub-category">
    <div class="container">
      <!-- 面包屑  -->
      <SubBread></SubBread>
      <!-- 筛选区 -->
      <SubFilter @sort-change="changeFilter"></SubFilter>
      <!-- 商品排序+列表 -->
      <div class="goods-list">
        <SubSort @sort-change="sortChange"></SubSort>
        <!-- //商品列表 -->
        <ul>
          <li v-for="item in goodsList" :key="item.id">
            <GoodsItem :goods="item" />
          </li>
        </ul>
        <!-- //无限加载 -->
        <xtx-infinite-loading
          @infinite="getData"
          :finished="finished"
          :loading="loading"
        ></xtx-infinite-loading>
      </div>
    </div>
  </div>
</template>

<script>
import SubBread from './components/sub-bread.vue'
import SubFilter from './components/sub-filter.vue'
import SubSort from './components/sub-sort.vue'
import GoodsItem from './components/goods-item.vue'
import XtxInfiniteLoading from '@/components/library/xtx-infinite-loading.vue'
import { ref, watch } from 'vue-demi'
import { findSubCategoryGoods } from '@/api/category'
import { useRoute } from 'vue-router'
export default {
  name: 'SubCategory',
  components: {
    SubBread,
    SubFilter,
    SubSort,
    GoodsItem,
    XtxInfiniteLoading
  },
  setup() {
    const route = useRoute()
    const loading = ref(false)
    const finished = ref(false)
    const goodsList = ref([])
    let reqParams = {
      page: 1,
      pageSize: 20
    }
    const getData = () => {
      //开启loading状态
      loading.value = true
      //添加当前二级分类查询商品
      reqParams.categoryId = route.params.id
      //调用api
      findSubCategoryGoods(reqParams).then(({ result }) => {
        if (result.items.length) {
          goodsList.value.push(...result.items)
          reqParams.page++
        } else {
          // 加载完毕
          finished.value = true
        }
        // 请求结束
        loading.value = false
      })
    }
    //更换分类后要重新加载数据否则数据重复
    watch(
      () => route.params.id,
      (newVal) => {
        if (newVal && route.path === `/category/sub/${newVal}`) {
          finished.value = false
          //将数据清空，最底下的加载组件进入可视区自动重新获取数据
          goodsList.value = []
          reqParams = {
            page: 1,
            pageSize: 20
          }
        }
      }
    )
    //点击排序组件重新请求
    const sortChange = (sortParams) => {
      finished.value = false
      //合并参数
      reqParams = { ...reqParams, ...sortParams }
      reqParams.page = 1
      goodsList.value = []
    }
    //点击筛选组件
    return {
      finished,
      loading,
      goodsList,
      getData,
      sortChange
    }
  }
}
</script>
<style scoped lang="less">
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
    li {
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>
