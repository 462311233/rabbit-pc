<template>
  <div class="goods-image">
    <!-- //大图 -->
    <div
      class="large"
      v-show="show"
      :style="[{ backgroundImage: `url(${images[currIndex]})` }, largePosition]"
    ></div>
    <div class="middle">
      <img :src="images[currIndex]" ref="target" alt="" />
      <!-- //遮罩 -->
      <div class="layer" v-show="show" :style="layerPosition"></div>
    </div>
    <ul class="small">
      <li
        v-for="(img, i) in images"
        :key="img"
        :class="{ active: i === currIndex }"
      >
        <img @mouseenter="currIndex = i" :src="img" alt="" />
      </li>
    </ul>
  </div>
</template>
<script>
import { reactive, ref, watch } from 'vue'
import { useMouseInElement } from '@vueuse/core'
export default {
  name: 'GoodsImage',
  props: {
    images: {
      type: Array,
      default: () => []
    }
  },
  setup() {
    //图片索引
    const currIndex = ref(0)
    //是否显示遮罩和大图
    const show = ref(false)
    //遮罩坐标
    const layerPosition = reactive({
      top: 0,
      left: 0
    })
    //大图坐标
    const largePosition = reactive({
      backgroundPosition: 0,
      backgroundPositionY: 0
    })
    //坐标定位
    const target = ref(null)
    const { elementX, elementY, isOutside } = useMouseInElement(target)
    watch([elementX, elementY, isOutside], () => {
      show.value = !isOutside.value
      //elementXY表示鼠标在元素内位置,根据这个值来设置遮罩的位置
      //记录数据
      const position = { x: 0, y: 0 }
      if (elementX.value > 300) {
        position.x = 200
      } else if (elementX.value < 100) {
        position.x = 0
      } else {
        position.x = elementX.value - 100
      }
      if (elementY.value > 300) {
        position.y = 200
      } else if (elementY.value < 100) {
        position.y = 0
      } else {
        position.y = elementY.value - 100
      }
      //赋值
      layerPosition.top = position.y + 'px'
      layerPosition.left = position.x + 'px'
      largePosition.backgroundPositionY = -2 * position.y + 'px'
      largePosition.backgroundPositionX = -2 * position.x + 'px'
    })
    return {
      currIndex,
      show,
      layerPosition,
      largePosition,
      target
    }
  }
}
</script>
<style scoped lang="less">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;
  z-index: 500;
  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }
  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
    position: relative;
    cursor: move;
    .layer {
      width: 200px;
      height: 200px;
      background: rgba(0, 0, 0, 0.2);
      left: 0;
      top: 0;
      position: absolute;
    }
  }
  .small {
    width: 80px;
    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;
      &:hover,
      &.active {
        border: 2px solid @xtxColor;
      }
    }
  }
}
</style>
