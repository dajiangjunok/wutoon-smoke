<template>
  <div class="store-card-container">
    <div class="store-card">
      <div class="line line1 flex-between">
        <div>
          <span class="t-14 text-ellipsis">{{detail.name}}</span>
          <!-- <i class="iconfont icon-jiantou4"></i> -->
        </div>
        <span>{{detail.distance&&detail.distance.toFixed(2) + 'km'}}</span>
      </div>
      <div class="line line2">
        <van-rate :value="Number(detail.evaluateScore)"
                  color="#FFC000"
                  size="16px"
                  allow-half
                  readonly />
        <span class="margin-left-10">{{detail.evaluateScore}} 分</span>
      </div>
      <!-- <div class="line line3">
        <div class="margin-right-10 margin-bottom-4"
             v-for="(item,index) in 3"
             :key="index">
          <i class="iconfont icon-youxuan color-orange"></i>
          <span>优选好店</span>
        </div>
      </div> -->
      <div class="line line4">
        <van-icon name="underway-o" />
        <span>{{detail.businessStartTime}} - {{detail.businessEndTime}}</span>
      </div>
      <div class="line line5">
        <i class="iconfont icon-dingwei1"></i>
        <span>
          {{detail.level1Address}}
          {{detail.level2Address}}
          {{detail.level3Address}}
          {{detail.detailAddress}}
        </span>
      </div>
      <div class="line flex-cente line6">
        <div class="margin-right-10">门店上榜:</div>
        <div class="margin-right-10 margin-bottom-4"
             v-for="(item,index) in detail.labelTextList"
             :key="index">
          <i class="iconfont icon-youxuan color-orange"></i>
          <span>{{item}}</span>
        </div>
      </div>
      <div class="line flex-evenly">
        <a :href="`tel:${detail.phone}`">
          <van-button round
                      class="lian-xi"
                      size="mini"
                      type="info">

            <i class="iconfont icon-dianhua"></i>
            电话联系
          </van-button>
        </a>
        <van-button round
                    @click="weiXinClick(detail.wechat)"
                    class="lian-xi"
                    size="mini"
                    type="info">
          <i class="iconfont icon-weixin"></i>
          微信联系
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'StoreCard',
  data () {
    return {


    }
  },
  props: {
    detail: {
      type: Object,
      required: true
    }
  },
  methods: {
    cardClick () {

    },
    // 获取店铺详情
    async getStoreInfo () {
      const res = await getShopInfo(this.$route.query.id)
      if (res.code == 0) {
        this.detail = res.data
        this.$emit(updateDetail, res.data)
        console.log(res.data);
      } else {
        this.$toast(res.msg)
      }
    },
    weiXinClick (wechat) {
      this.$dialog.alert({
        title: '店铺微信',
        message: wechat,
      }).then(() => {
        // on close
      });
    }
  },
  created () {
    // this.getStoreInfo()
  }
}
</script>

<style scoped lang="scss">
.store-card-container {
  padding: 0.1rem 0.1rem 0;
  /* min-height: 2.4rem; */
}
.store-card {
  margin-bottom: 0.1rem;
  padding: 0.14rem 0.1rem 0.1rem;
  background-color: #fff;
  font-size: 0.12rem;
  border-radius: 8px;
  & > .line {
    margin-bottom: 0.04rem;
  }
  & > .line:nth-child(3) {
    & > i {
      position: relative;
      top: 2px;
    }
    & > span {
      display: inline-block;
      margin-left: 10px;
    }
  }
  & > .line:nth-child(4),
  & > .line:nth-child(5) {
    color: #999;
  }
  .line1 div {
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

  .line6 {
    display: flex;
    margin-top: 0.2rem;
    margin-left: 0.1rem;
    padding-bottom: 0.16rem;
    border-bottom: 1px solid #e5e5e5;
  }

  ::v-deep .van-button--mini.lian-xi {
    margin-top: 0.1rem;
    padding: 0 26px !important;
    background: linear-gradient(150deg, #00aaee, #3ac5fd);
    border: 1px solid #fff;
  }
}
</style>
