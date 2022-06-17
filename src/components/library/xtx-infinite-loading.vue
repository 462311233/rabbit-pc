<template>
  <div class="xtx-infinite-loading" ref="target">
    <div class="loading" v-if="loading">
      <span class="img"></span>
      <span class="text">正在加载...</span>
    </div>
    <div class="none" v-if="finished">
      <span class="img"></span>
      <span class="text">亲，没有更多了</span>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue-demi'
import { useIntersectionObserver } from '@vueuse/core'
export default {
  name: 'XtxInfiniteLoading',
  //通过父组件传入数据加载状态
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    finished: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    //定义标签
    const target = ref(null)
    //监听target是否进入可视区
    const { stop } = useIntersectionObserver(
      target,
      ([{ isIntersecting }]) => {
        //进入可视区调用数据请求
        if (isIntersecting) {
          //第一种情况：没有加载并且还有数据未加载完时
          if (!props.loading && !props.finished) {
            //触发自定义事件
            emit('infinite')
          }
        }
      },
      { threshold: 0 }
    )
    return {
      target,
      stop,
      useIntersectionObserver
    }
  }
}
</script>
<style scoped lang="less">
.xtx-infinite-loading {
  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    .img {
      width: 50px;
      height: 50px;
      background: url(../../assets/images/load.gif) no-repeat center / contain;
    }
    .text {
      color: #999;
      font-size: 16px;
    }
  }
  .none {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    .img {
      width: 200px;
      height: 134px;
      background: url(../../assets/images/none.png) no-repeat center / contain;
    }
    .text {
      color: #999;
      font-size: 16px;
    }
  }
}
</style>
