<template>
  <div class="xtx-city" ref="target">
    <div class="select" @click="toggle" :class="{ active: visible }">
      <span v-if="!fullLocation" class="placeholder">请选择配送地址</span>
      <span v-else class="value">{{ fullLocation }}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-show="visible">
      <div class="loading" v-if="loading"></div>
      <template v-else>
        <span
          class="ellipsis"
          @click="changeItem(item)"
          v-for="item in currList"
          :key="item.code"
          >{{ item.name }}</span
        >
      </template>
    </div>
  </div>
</template>

<script>
import { ref, computed, reactive } from 'vue-demi'
import { onClickOutside } from '@vueuse/core'
import axios from 'axios'
export default {
  name: 'XtxCity',
  props: {
    fullLocation: {
      type: String,
      default: ''
    }
  },
  setup(props, { emit }) {
    //城市数据
    const allCityData = ref([])
    //加载状态
    const loading = ref(true)
    //控制城市选项框的显示
    const visible = ref(false)
    const open = () => {
      visible.value = true
      //获取数据
      getCityData().then((data) => {
        allCityData.value = data
        loading.value = false
      })
      //清空
      for (let k in changeResult) {
        changeResult[k] = ''
      }
    }
    const close = () => {
      visible.value = false
    }
    const toggle = () => {
      visible.value ? close() : open()
    }
    //点击外部选项框关闭
    const target = ref(null)
    //传入元素标签和回调
    onClickOutside(target, () => {
      close()
    })
    //城市数据
    const currList = computed(() => {
      //省
      let list = allCityData.value
      // TODO 根据点击的省份城市获取对应的列表
      //市
      if (changeResult.provinceCode && changeResult.provinceName) {
        //提取列表中省代码与你点击的省的代码相同的城市列表
        list = list.find((p) => p.code === changeResult.provinceCode).areaList
      }
      //县
      if (changeResult.cityCode) {
        list = list.find((c) => c.code === changeResult.cityCode).areaList
      }
      return list
    })
    //创建选择的省市区集合数据
    const changeResult = reactive({
      provinceCode: '',
      provinceName: '',
      cityCode: '',
      cityName: '',
      countyCode: '',
      countyName: '',
      fullLocation: ''
    })
    const changeItem = (item) => {
      if (item.level === 0) {
        changeResult.provinceCode = item.code
        changeResult.provinceName = item.name
      }
      if (item.level === 1) {
        changeResult.cityCode = item.code
        changeResult.cityName = item.name
      }
      if (item.level === 2) {
        changeResult.countyCode = item.code
        changeResult.countyName = item.name
        close()
        changeResult.fullLocation = `${changeResult.provinceName} ${changeResult.cityName} ${changeResult.countyName}`

        emit('change', changeResult)
      }
    }

    return {
      currList,
      visible,
      target,
      loading,
      toggle,
      changeItem
    }
  }
}
const getCityData = () => {
  return new Promise((resolve) => {
    //判断本地是否有数据
    if (window.cityData) {
      resolve(window.cityData)
      //没有就请求
    } else {
      const url =
        'https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json'
      axios.get(url).then((res) => {
        resolve(res.data)
        //存储为Window属性
        window.cityData = res.data
      })
    }
  })
}
</script>
<style scoped lang="less">
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    .loading {
      height: 290px;
      width: 100%;
      background: url(../../assets/images/load.gif) no-repeat center;
    }
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
  }
}
</style>
