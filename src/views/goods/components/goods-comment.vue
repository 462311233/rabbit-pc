<template>
  <div class="goods-comment" v-if="commentInfo">
    <!-- 头部 -->
    <div class="head">
      <div class="data">
        <p>
          <span>{{ commentInfo.salesCount }}</span
          ><span>人购买</span>
        </p>
        <p>
          <span>{{ commentInfo.praisePercent }}</span
          ><span>好评率</span>
        </p>
      </div>
      <div class="tags">
        <div class="dt">大家都在说：</div>
        <div class="dd">
          <a
            v-for="(item, i) in commentInfo.tags"
            :key="item.title"
            href="javascript:;"
            :class="{ active: currTagIndex === i }"
            @click="changeTag(i)"
          >
            {{ item.title }}（{{ item.tagCount }}）
          </a>
        </div>
      </div>
    </div>
    <div class="sort">
      <span>排序：</span>
      <a
        @click="reqParams.sortField = null"
        href="javascript:;"
        :class="{ active: reqParams.sortField === null }"
        >默认</a
      >
      <a
        @click="reqParams.sortField = 'praiseCount'"
        href="javascript:;"
        :class="{ active: reqParams.sortField === 'praiseCount' }"
        >最热</a
      >
      <a
        @click="reqParams.sortField = 'createTime'"
        href="javascript:;"
        :class="{ active: reqParams.sortField === 'createTime' }"
        >最新</a
      >
    </div>
    <!-- 列表 -->
    <div class="list" v-if="commentList">
      <div class="item" v-for="item in commentList" :key="item.id">
        <div class="user">
          <img :src="item.member.avatar" alt="" />
          <span>{{ item.member.nickname }}</span>
        </div>
        <div class="body">
          <div class="score">
            <i class="iconfont icon-wjx01" v-for="i in item.score" :key="i"></i>
            <i
              class="iconfont icon-wjx02"
              v-for="i in 5 - item.score"
              :key="i"
            ></i>
            <span class="attr">{{ formatSpecs(item.orderInfo.specs) }}</span>
          </div>
          <div class="text">
            {{ item.content }}
          </div>
          <!-- //评论图片 -->
          <GoodsCommentImage
            v-if="item.pictures.length"
            :pictures="item.pictures"
          ></GoodsCommentImage>
          <div class="time">
            <span>{{ item.createTime }}</span>
            <span class="zan"
              ><i class="iconfont icon-dianzan"></i>{{ item.praiseCount }}</span
            >
          </div>
        </div>
      </div>
    </div>
    <!-- 分页组件 -->
    <XtxPagination
      @current-change="changePager"
      :total="total"
      :current-page="reqParams.page"
    />
  </div>
</template>
<script>
import GoodsCommentImage from './goods-comment-image.vue'
import XtxPagination from '@/components/library/xtx-pagination.vue'
import { inject, reactive, ref, watch } from 'vue-demi'
import { findCommentInfoByGoods, findCommentList } from '@/api/product'
export default {
  name: 'GoodsComment',
  components: {
    GoodsCommentImage,
    XtxPagination
  },
  setup() {
    const commentInfo = ref(null)
    const goods = inject('goods')
    findCommentInfoByGoods(goods.value.id).then((data) => {
      //先添加有图和全部两个评价tag
      data.result.tags.unshift({
        title: '有图',
        tagCount: data.result.hasPictureCount,
        type: 'img'
      })
      data.result.tags.unshift({
        title: '全部评价',
        tagCount: data.result.evaluateCount,
        type: 'all'
      })
      commentInfo.value = data.result
      console.log(commentInfo.value)
    })
    // 记录当前激活的索引
    const currTagIndex = ref(0)
    const changeTag = (i) => {
      currTagIndex.value = i
      //拿到当前点击的tag数据
      const tag = commentInfo.value.tags[i]
      if (tag.type === 'all') {
        reqParams.hasPicture = null
        reqParams.tag = null
      } else if (tag.type === 'img') {
        reqParams.hasPicture = true
        reqParams.tag = null
      } else {
        reqParams.hasPicture = null
        reqParams.tag = tag.title
      }
    }
    //筛选条件数据
    const reqParams = reactive({
      //默认显示第一页
      page: 1,
      //每页数量
      pageSize: 10,
      //有图
      hasPicture: null,
      //关键字标签
      tag: null,
      //排序方式
      sortField: null
    })
    //初始化数据，筛选条件更改时发送数据请求
    const commentList = ref([])
    const total = ref(0)
    watch(
      reqParams,
      () => {
        //发起请求
        findCommentList(goods.id, reqParams).then((data) => {
          commentList.value = data.result.items
          total.value = data.result.counts
          console.log(commentList.value)
        })
      },
      { immediate: true }
    )
    // 改变分页函数
    const changePager = (np) => {
      reqParams.page = np
    }
    // 定义转换数据的函数（对应vue2.0的过滤器）
    const formatSpecs = (specs) => {
      return specs.reduce((p, c) => `${p} ${c.name}：${c.nameValue}`, '').trim()
    }
    const formatNickname = (nickname) => {
      return nickname.substr(0, 1) + '****' + nickname.substr(-1)
    }
    return {
      commentInfo,
      currTagIndex,
      changeTag,
      reqParams,
      commentList,
      formatSpecs,
      formatNickname,
      changePager
    }
  }
}
</script>
<style scoped lang="less">
.goods-comment {
  .head {
    display: flex;
    padding: 30px 0;
    .data {
      width: 340px;
      display: flex;
      padding: 20px;
      p {
        flex: 1;
        text-align: center;
        span {
          display: block;
          &:first-child {
            font-size: 32px;
            color: @priceColor;
          }
          &:last-child {
            color: #999;
          }
        }
      }
    }
    .tags {
      flex: 1;
      display: flex;
      border-left: 1px solid #f5f5f5;
      .dt {
        font-weight: bold;
        width: 100px;
        text-align: right;
        line-height: 42px;
      }
      .dd {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        > a {
          width: 132px;
          height: 42px;
          margin-left: 20px;
          margin-bottom: 20px;
          border-radius: 4px;
          border: 1px solid #e4e4e4;
          background: #f5f5f5;
          color: #999;
          text-align: center;
          line-height: 40px;
          &:hover {
            border-color: @xtxColor;
            background: lighten(@xtxColor, 50%);
            color: @xtxColor;
          }
          &.active {
            border-color: @xtxColor;
            background: @xtxColor;
            color: #fff;
          }
        }
      }
    }
  }
  .sort {
    height: 60px;
    line-height: 60px;
    border-top: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
    margin: 0 20px;
    color: #666;
    > span {
      margin-left: 20px;
    }
    > a {
      margin-left: 30px;
      &.active,
      &:hover {
        color: @xtxColor;
      }
    }
  }
}
.list {
  padding: 0 20px;
  .item {
    display: flex;
    padding: 25px 10px;
    border-bottom: 1px solid #f5f5f5;
    .user {
      width: 160px;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
      }
      span {
        padding-left: 10px;
        color: #666;
      }
    }
    .body {
      flex: 1;
      .score {
        line-height: 40px;
        .iconfont {
          color: #ff9240;
          padding-right: 3px;
        }
        .attr {
          padding-left: 10px;
          color: #666;
        }
      }
    }
    .text {
      color: #666;
      line-height: 24px;
    }
    .time {
      color: #999;
      display: flex;
      justify-content: space-between;
      margin-top: 5px;
    }
  }
}
</style>
