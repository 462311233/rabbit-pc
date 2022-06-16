<template>
  <!-- 筛选区 -->
  <div class="sub-filter" v-if="filterData">
    <div class="item">
      <div class="head">品牌：</div>
      <div class="body">
        <a
          href="javascript:;"
          v-for="item in filterData.brands"
          :key="item.id"
          >{{ item.name }}</a
        >
      </div>
    </div>
    <div class="item" v-for="item in filterData.saleProperties" :key="item.id">
      <div class="head">{{ item.name }}：</div>
      <div class="body">
        <a href="javascript:;" v-for="prop in item.properties" :key="prop.id">{{
          prop.name
        }}</a>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, watch } from 'vue-demi'
import { useRoute } from 'vue-router'
import { findSubCategoryFilter } from '@/api/category'
export default {
  name: 'SubFilter',
  setup() {
    const route = useRoute()
    //创建筛选数据
    const filterData = ref(null)
    //监听路由变化，获取新的筛选数据
    watch(
      () => route.params.id,
      (newValue) => {
        //如果变化后处在二级路由下
        if (newValue && route.path === `/category/sub/${newValue}`) {
          //发送请求
          findSubCategoryFilter(newValue).then((data) => {
            //可选条件加上‘全部’
            data.result.brands.unshift({ id: null, name: '全部' })
            data.result.saleProperties.forEach((item) => {
              item.properties.unshift({ id: null, name: '全部' })
            })
            filterData.value = data.result
          })
        }
      },
      { immediate: true }
    )
    return { filterData }
  }
}
</script>
<style scoped lang="less">
// 筛选区
.sub-filter {
  background: #fff;
  padding: 25px;
  .item {
    display: flex;
    line-height: 40px;
    .head {
      width: 80px;
      color: #999;
    }
    .body {
      flex: 1;
      a {
        margin-right: 36px;
        transition: all 0.3s;
        display: inline-block;
        &.active,
        &:hover {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>
