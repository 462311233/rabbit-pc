<template>
  <div class="goods-sku">
    <dl v-for="item in goods.specs" :key="item.id">
      <dt>{{ item.name }}</dt>
      <dd>
        <template v-for="val in item.values" :key="val.name">
          <img
            :class="{ selected: val.selected, disabled: val.disabled }"
            @click="changeSku(item, val)"
            v-if="val.picture"
            :src="val.picture"
            :title="val.name"
          />
          <span
            :class="{ selected: val.selected }"
            @click="changeSku(item, val)"
            v-else
            >{{ val.name }}</span
          >
        </template>
      </dd>
    </dl>
  </div>
</template>
<script>
import powerSet from '@/vender/power-set.js'
//创建路径字典，查询商品规格组合是否可选
const splitter = '~'
const getPathMap = (skus) => {
  //声明路径字典
  const pathMap = {}
  skus.forEach((sku) => {
    //筛选有库存的sku
    if (sku.inventory > 0) {
      //将有效sku通过算法得出sku子集也就是可选规格任意组合
      //创建可选数组,取出所需数据（规格的名字）
      const valueArr = sku.specs.map((val) => val.valueName)
      //算法得出子集
      const valueArrPowerSet = powerSet(valueArr)
      //将子集中每一项组合转化成字符串拼接
      valueArrPowerSet.forEach((arr) => {
        //数组转化字符串
        const key = arr.join(splitter)
        //设置pathMap数据
        if (pathMap[key]) {
          pathMap[key].push(sku.id)
        } else {
          pathMap[key] = [sku.id]
        }
      })
    }
  })
  return pathMap
}
//获取选中的按钮,将选中的规格传入一个数组用于字典查询
const getSelectedValues = (specs) => {
  //建立数组接收
  const arr = []
  //取出数据中选中状态为true的
  specs.forEach((item) => {
    const selectedVal = item.values.find((val) => val.selected)
    //没选中就添加undefined
    arr.push(selectedVal ? selectedVal.name : undefined)
  })
  return arr
}
//更新按钮禁用状态
const updateDisabledStatus = (specs, pathMap) => {
  //每个按钮可选状态由disabled控制
  specs.forEach((item, i) => {
    const SelectedValues = getSelectedValues(specs)
    item.values.forEach((val) => {
      //如果已经选中则不用判断禁用
      if (val.selected) return
      SelectedValues[i] = val.name
      //剔除undefined，拼接为字符串
      const key = SelectedValues.filter((value) => value).join(splitter)
      //字典中找不到就禁用
      val.disabled = !pathMap[key]
    })
  })
}
//默认选中
// 初始化选中状态
const initSelectedStatus = (goods, skuId) => {
  const sku = goods.skus.find((sku) => sku.id === skuId)
  if (sku) {
    goods.specs.forEach((spec, i) => {
      const value = sku.specs[i].valueName
      spec.values.forEach((val) => {
        val.selected = val.name === value
      })
    })
  }
}
export default {
  name: 'GoodsSku',
  props: {
    goods: {
      type: Object,
      default: () => ({})
    },
    skuId: {
      type: String,
      default: ''
    }
  },
  setup(props, { emit }) {
    // 根据传入的skuId默认选中规格按钮
    initSelectedStatus(props.goods, props.skuId)
    //路径字典,传入所有sku通过函数过滤
    const pathMap = getPathMap(props.goods.skus)
    updateDisabledStatus(props.goods.specs, pathMap)
    //为每个选项都添加一个是否选中状态
    const changeSku = (item, val) => {
      //禁用状态阻止改变样式
      if (val.disabled) return

      if (val.selected) {
        val.selected = false
      } else {
        item.values.forEach((valItem) => {
          valItem.selected = false
        })
        val.selected = true
      }
      updateDisabledStatus(props.goods.specs, pathMap)
      // 触发change事件将sku数据传递出去
      const selectedArr = getSelectedValues(props.goods.specs).filter((v) => v)
      if (selectedArr.length === props.goods.specs.length) {
        const skuIds = pathMap[selectedArr.join(splitter)]
        const sku = props.goods.skus.find((sku) => sku.id === skuIds[0])
        // 传递
        emit('change', {
          skuId: sku.id,
          price: sku.price,
          oldPrice: sku.oldPrice,
          inventory: sku.inventory,
          specsText: sku.specs
            .reduce((p, n) => `${p} ${n.name}：${n.valueName}`, '')
            .replace(' ', '')
        })
      } else {
        emit('change', {})
      }
    }

    return { changeSku, pathMap }
  }
}
</script>
<style scoped lang="less">
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  &.selected {
    border-color: @xtxColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}
.goods-sku {
  padding-left: 10px;
  padding-top: 20px;
  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      flex: 1;
      color: #666;
      > img {
        width: 50px;
        height: 50px;
        .sku-state-mixin ();
      }
      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>
