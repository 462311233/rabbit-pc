<template>
  <div class="goods-relevant">
    <div class="header">
      <i class="icon" />
      <span class="title">{{ goodsId ? '同类商品推荐' : '猜你喜欢' }}</span>
    </div>
    <!-- 此处使用改造后的xtx-carousel.vue -->
    <xtx-carousel :sliders="sliders"></xtx-carousel>
  </div>
</template>

<script>
import { ref } from 'vue-demi'
import { findRelevantGoods } from '@/api/product'
export default {
  // 同类推荐，猜你喜欢
  name: 'GoodsRelevant',
  props: {
    goodsId: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    //获取商品列表给轮播图
    const sliders = ref([])
    findRelevantGoods({ id: props.goodsId }).then((data) => {
      //设置单页显示数量
      const pageSize = 4
      const pageCount = Math.ceil(data.result.length / pageSize)
      //每四个为一个数组添加进sliders数组
      for (let i = 0; i < pageCount; i++) {
        sliders.value.push(data.result.slice(i * pageSize, (i + 1) * pageSize))
      }
    })
    return { sliders }
  }
}
</script>

<style scoped lang="less">
.goods-relevant {
  background: #fff;
  min-height: 460px;
  margin-top: 20px;
  .header {
    height: 80px;
    line-height: 80px;
    padding: 0 20px;
    .title {
      font-size: 20px;
      padding-left: 10px;
    }
    .icon {
      width: 16px;
      height: 16px;
      display: inline-block;
      border-top: 4px solid @xtxColor;
      border-right: 4px solid @xtxColor;
      box-sizing: border-box;
      position: relative;
      transform: rotate(45deg);
      &::before {
        content: '';
        width: 10px;
        height: 10px;
        position: absolute;
        left: 0;
        top: 2px;
        background: lighten(@xtxColor, 40%);
      }
    }
  }
}
:deep(.xtx-carousel) {
  height: 380px;
  .carousel {
    &-indicator {
      bottom: 30px;
      span {
        &.active {
          background: @xtxColor;
        }
      }
    }
    &-btn {
      top: 110px;
      opacity: 1;
      background: rgba(0, 0, 0, 0);
      color: #ddd;
      i {
        font-size: 30px;
      }
    }
  }
}
</style>
