<template>
  <div class="chanpin-info">
    <div class="sub-title">
      <span>{{info.title}}</span>
    </div>
    <!-- 1.卡片类型 -->
    <div class="card-type"
         v-if="info.type=='label'">
      <span v-for="(item,index) in info.list"
            :key="index">{{item}}</span>
    </div>
    <!-- 口味信息类型 -->
    <div class="flavor-type"
         v-if="info.type=='info'">
      <div v-for="(item,index) in info.list"
           class="flex flex-center"
           :key="index">
        <i :class="item.icon"></i>
        <span class="info-text">{{index|infoText}}</span>
        <van-rate v-model="item.value"
                  :size="20"
                  color="#ffd21e"
                  void-color="#eee"
                  readonly />
      </div>
    </div>
    <!-- 口味评价类型 -->
    <div class="pingjia-type"
         v-if="info.type=='pinJia'">
      <div v-for="(item,index) in info.list"
           :key="index">
        <div class="flex margin-top-10 margin-bottom-10">
          <img class="img"
               :src="item.img"
               alt="头像" />
          <div class="flex flex-column flex-evenly margin-left-10">
            <span>{{item.name}}</span>
            <span class="color-6">{{item.time | timeFromNow}}</span>
          </div>
        </div>
        <div class="t-14">{{item.text}}</div>
      </div>
    </div>
  </div>
</template>

<script>
const relativeTime = require('dayjs/plugin/relativeTime')
import dayjs from 'dayjs'

export default {
  name: 'ChanPinCard',
  props: {
    info: {
      type: Object,
      required: true
    }
  },
  filters: {
    infoText (index) {
      switch (index) {
        case 0:
          return '甜度'
        case 1:
          return '凉度'
        case 2:
          return '浓郁度'
        default:
          return
      }
    },
    timeFromNow (time) {
      dayjs().locale('zh-cn').format() // 当前实例使用
      dayjs.extend(relativeTime)
      return dayjs(time).fromNow() // 22 年前
    }
  }
}
</script>

<style scoped lang="scss">
.chanpin-info {
  padding: 0.1rem 0.1rem;
  margin-bottom: 0.1rem;
  background-color: #fff;

  .sub-title {
    padding-bottom: 0.1rem;
    color: #333333;
    font-size: 0.14rem;
    border-bottom: 1px solid #e5e5e5;
  }

  .sub-title > span {
    padding-left: 0.1rem;
    border-left: 2px solid #00aaf0;
  }
  .card-type {
    display: flex;
    flex-wrap: wrap;
    margin-top: 0.2rem;
    & > span {
      padding: 4px 8px;
      margin-right: 0.1rem;
      margin-bottom: 0.08rem;
      color: #666666;
      background: #ededed;
      border-radius: 10px;
    }
  }

  .flavor-type {
    color: #9ee3ff;

    & .iconfont {
      margin: 0.06rem 0;
      display: inline-block;
      margin-right: 0.1rem;
      font-size: 0.22rem;
    }

    .info-text {
      display: inline-block;
      width: 0.6rem;
      color: #000;
      font-size: 0.14rem;
    }
  }

  .pingjia-type {
    .img {
      width: 0.35rem;
      border-radius: 50%;
    }
  }
}
</style>