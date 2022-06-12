<template>
  <div class="xtx-carousel">
    <ul class="carousel-body" @mouseenter="stop" @mouseleave="start">
      <!-- 图片区域 -->
      <li
        class="carousel-item"
        v-for="(item, i) in sliders"
        :key="i"
        :class="{ fade: index === i }"
      >
        <RouterLink to="">
          <img :src="item.imgUrl" alt="" />
        </RouterLink>
      </li>
    </ul>
    <!-- 上一张 -->
    <a href="javascript:;" class="carousel-btn prev" @click="toggle(-1)"
      ><i class="iconfont icon-angle-left"></i
    ></a>
    <!-- 下一张 -->
    <a href="javascript:;" class="carousel-btn next" @click="toggle(1)"
      ><i class="iconfont icon-angle-right"></i
    ></a>
    <!-- 点点点 -->
    <div class="carousel-indicator">
      <span
        v-for="(item, i) in sliders"
        :key="i"
        :class="{ active: index === i }"
        @click="index = i"
      ></span>
    </div>
  </div>
</template>

<script>
import { onUnmounted, ref, watch } from 'vue-demi'
export default {
  name: 'XtxCarousel',
  props: {
    //接受过来的轮播图数据
    sliders: {
      type: Array,
      default: () => []
    },
    //是否自动轮播
    autoPlay: {
      type: Boolean,
      default: true
    },
    //间隔时间
    duration: {
      type: Number,
      default: 3000
    }
  },
  setup(props) {
    const index = ref(0)
    //轮播逻辑
    //声明定时器
    let timer = null
    const autoPlayFn = () => {
      //添加防抖防止鼠标进入重复触发
      clearInterval(timer)
      timer = setInterval(() => {
        index.value++
        if (index.value >= props.sliders.length) {
          index.value = 0
        }
      }, props.duration)
    }
    //监听sliders是否有值，且autoplay为true，这时开启定时器
    watch(
      //传入要监听的值，必须是getter函数形式
      () => props.sliders,
      (newValue) => {
        if (newValue.length && props.autoPlay) {
          autoPlayFn()
        }
      }
    )
    //鼠标进入停止自动离开开启！！注意autoplay是首要条件
    const stop = () => {
      if (timer) {
        clearInterval(timer)
      }
    }
    const start = () => {
      if (props.sliders.length && props.autoPlay) {
        autoPlayFn()
      }
    }
    //点击切换
    const toggle = (step) => {
      index.value += step
      if (index.value > props.sliders.length - 1) {
        index.value = 0
        return
      }
      if (index.value < 0) {
        index.value = props.sliders.length - 1
        return
      }
    }
    //组件卸载时清除定时器
    onUnmounted(() => {
      clearInterval(timer)
    })

    return {
      index,
      timer,
      autoPlayFn,
      stop,
      start,
      toggle
    }
  }
}
</script>
<style scoped lang="less">
.xtx-carousel {
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;
  .carousel {
    &-body {
      width: 100%;
      height: 100%;
    }
    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;
      &.fade {
        opacity: 1;
        z-index: 1;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;
      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        cursor: pointer;
        ~ span {
          margin-left: 12px;
        }
        &.active {
          background: #fff;
        }
      }
    }
    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0, 0, 0, 0.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;
      &.prev {
        left: 20px;
      }
      &.next {
        right: 20px;
      }
    }
  }
  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}
</style>
