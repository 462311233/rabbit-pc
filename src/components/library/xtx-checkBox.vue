<template>
  <div class="xtx-checkbox" @click="change">
    <i v-if="modelValue" class="iconfont icon-checked"></i>
    <i v-else class="iconfont icon-unchecked"></i>
    <span v-if="$slots.default">
      <slot></slot>
    </span>
  </div>
</template>
<script>
import { ref, watch } from 'vue-demi'
export default {
  name: 'XtxCheckbox',
  props: {
    //v-model指令向组件内部传递数据使用的的自定义属性统称
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const checked = ref(false)
    const change = () => {
      checked.value = !checked.value
      //使用emit将数据变化传递给父组件
      emit('update:modelValue', checked.value)
    }
    //监听自定义属性同时改变checked
    watch(
      () => props.modelValue,
      () => {
        checked.value = props.modelValue
        //让组件支持change事件
        emit('change', checked.value)
      },
      { immediate: true }
    )
    return {
      checked,
      change
    }
  }
}
</script>
<style scoped lang="less">
.xtx-checkbox {
  display: inline-block;
  margin-right: 2px;
  .icon-checked {
    color: @xtxColor;
    ~ span {
      color: @xtxColor;
    }
  }
  i {
    position: relative;
    top: 1px;
  }
  span {
    margin-left: 2px;
  }
}
</style>
