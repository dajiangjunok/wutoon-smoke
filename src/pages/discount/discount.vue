<template>
  <div class="discount">
    <NavBar title="优惠券" />
    <van-tabs v-model="activeName">
      <van-tab title="可使用"
               name="keShiYong">
        <div class="discount-uselist"
             v-if="usableCouponList.length!=0">
          <div class="coupon"
               v-for="item in usableCouponList"
               :key="item.id">
            <div class="color-primary coupon-left">
              <span class="t-16">
                ￥<span class="t-24">{{item.amount/100 }}</span>
              </span>
              <span class="t-14">满 {{item.amountLimit/100 }}可用</span>
            </div>
            <div class="coupon-right">
              <span class="t-16">{{item.useType | formatUseType}}</span>
              <span class="t-12 color-9">领取日期:{{item.createTime}}</span>
            </div>
          </div>
        </div>
        <NoDiscount v-else />
      </van-tab>
      <van-tab title="已使用"
               name="yiShiYong">
        <div class="discount-uselist"
             v-if="unavailableCouponList.length!=0">
          <div class="coupon unuselist"
               v-for="item in unavailableCouponList"
               :key="item.id">
            <div class="yishiyong">已使用</div>
            <div class="color-primary coupon-left">
              <span class="t-16">
                ￥<span class="t-24">{{item.amount/100 }}</span>
              </span>
              <span class="t-14">满 {{item.amountLimit/100 }}可用</span>
            </div>
            <div class="coupon-right">
              <span class="t-16">{{item.useType | formatUseType}}</span>
              <span class="t-12 color-9">领取日期:{{item.createTime}}</span>
            </div>
          </div>
        </div>
        <NoDiscount v-else />

      </van-tab>
      <!-- <van-tab title="已过期"
               name="yiGuoQi">内容 3</van-tab> -->
    </van-tabs>
  </div>
</template>

<script>
import NavBar from '@/components/base/NavBar.vue'
import { mapGetters } from 'vuex'

import NoDiscount from './components/NoDiscount.vue'

export default {
  name: "discount",
  mixins: [],
  props: {

  },
  data: function () {
    return {
      activeName: "keShiYong",
    }
  },
  async created () {
    await this.getCouponList(this.$store.state.app.userId)
  },

  computed: {
    // ...mapState('coupon', ['couponList']),
    ...mapGetters('coupon', ['usableCouponList', 'unavailableCouponList']),
  },
  methods: {
    // 获取优惠券列表
    getCouponList (userId) {
      this.$store.dispatch('coupon/getCouponList', userId)
    }
  },
  components: {
    NavBar,
    NoDiscount
  },
  filters: {
    formatUseType (type) {

      if (type == 1) {
        return '所有商品可使用'
      } else if (type == 2) {
        return '部分商品可使用'
      }
    }
  }
}
</script>

<style scoped lang="scss">
.discount {
  background-color: #eee;
  ::v-deep .van-tabs__nav {
    background-color: #262626;
    .van-tab--active,
    .van-tab {
      color: #fff;
    }

    .van-tabs__line {
      background-color: #c69d6d;
      width: 70px;
    }
  }

  .discount-uselist {
    padding: 0 0.1rem;
    height: calc(100vh - 132px);
    overflow: auto;
  }

  .coupon {
    display: flex;
    position: relative;
    justify-content: space-evenly;
    margin: 0.1rem 0;
    height: 0.8rem;
    /* line-height: 0.8rem; */
    background-color: #fff;
    box-sizing: border-box;
    overflow: hidden;

    .coupon-left {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
    }
    .coupon-right {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
    }

    .yishiyong {
      position: absolute;
      right: -0.34rem;
      top: -0.14rem;
      padding: 0.3rem 0.3rem 0.1rem;
      background-color: #999;
      color: #fff;
      transform: rotate(45deg);
    }
  }
  .unuselist {
    opacity: 0.6;
  }
}
</style>
