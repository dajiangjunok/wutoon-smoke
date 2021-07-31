<template>
  <div class="store-card"
       @click="cardClick">
    <div class="line line1 flex-between">
      <div>
        <span class="color-primary">{{detail.typeText}}</span>
        <span style="text-align: left;"
              class="text-ellipsis">{{detail.name}}</span>

      </div>
      <span> <i class="iconfont icon-jiantou4"></i>{{detail.distance.toFixed(2)}}km</span>
    </div>
    <div class="line line2">
      <van-rate :value="Number(detail.evaluateScore)"
                color="#FFC000"
                size="16px"
                allow-half
                readonly />
      <span class="margin-left-10">{{detail.evaluateScore}} 分</span>
    </div>
    <div class="line line3">
      <div class="margin-right-10 margin-bottom-4"
           v-for="(item,index) in detail.labelTextList"
           :key="index">
        <i class="iconfont icon-youxuan color-orange"></i>
        <span>{{item}}</span>
      </div>
    </div>
    <div class="line line4">
      <van-icon name="underway-o" />
      <span>{{detail.businessStartTime}} - {{detail.businessEndTime}}</span>
    </div>
    <div class="line line5">
      <i class="iconfont icon-dingwei1"></i>
      <span>{{detail.detailAddress}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StoreCard',
  props: {
    detail: {
      type: Object,
      required: true
    }
  },
  data () {
    return {

    }
  },
  methods: {
    cardClick () {
      this.$router.push({
        path: '/storedetail',
        query: {
          id: this.detail.id
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.store-card {
  margin-bottom: 0.1rem;
  padding: 0.1rem;
  background-color: #fff;
  font-size: 0.12rem;
  border-radius: 8px;

  & > .line {
    margin-bottom: 0.04rem;
  }
  & > .line:nth-child(4),
  & > .line:nth-child(5) {
    color: #999;
    i {
      position: relative;
      top: 2px;
      display: inline-block;
      margin-right: 10px;
    }
  }
  .line1 div {
    & > span:nth-child(1) {
      position: relative;
      top: -0.06rem;
      padding: 2px 4px;
      background-color: #333333;
      border-radius: 4px;
    }
    & > span:nth-child(2) {
      display: inline-block;
      margin-left: 0.06rem;
      margin-right: 0.04rem;
      font-size: 0.16rem;
      width: 1.8rem;
    }

    & > .iconfont {
      position: relative;
      top: -0.02rem;
      font-size: 0.18rem;
    }
  }

  .line3 {
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
    width: 2rem;

    & .icon-youxuan {
      margin-right: 0.02rem;
      font-size: 0.14rem;
    }
  }
}
</style>