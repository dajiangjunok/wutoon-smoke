<template>
  <div id="app">
    <van-popup round
               v-model="show">
      <van-icon name="close"
                @click="show=false"
                class="icon-close" />
      <div class="erweima">
        <img src="~@/assets/img/tiaoxingma.png"
             alt="条形码">
        <img src="~@/assets/img/erweima.png"
             alt="条形码">
      </div>

    </van-popup>
    <van-tabbar v-model="active"
                v-if="isShowLink"
                active-color="#C79D6B"
                inactive-color="#8B8B8B"
                :route="true"
                :replace="true"
                :safe-area-inset-bottom="true"
                @change="onChange">
      <van-tabbar-item icon-prefix="iconfont  icon"
                       icon="home"
                       to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon-prefix="iconfont  icon"
                       icon="baike"
                       to="/chanpindetail">产品详情</van-tabbar-item>
      <!-- <van-tabbar-item icon-prefix="iconfont  icon"
                       icon="vip"
                       @click="showPopup">会员卡</van-tabbar-item> -->
      <van-tabbar-item icon-prefix="iconfont  icon"
                       icon="youhuiquan"
                       to="/discount">优惠券</van-tabbar-item>
      <van-tabbar-item icon-prefix="iconfont  icon"
                       icon="wodedangxuan"
                       to="/profile">我的</van-tabbar-item>
    </van-tabbar>
    <router-view></router-view>
  </div>
</template>

<script>
// import { Notify } from 'vant';

export default {
  name: 'App',
  data () {
    return {
      active: 0,
      show: false,
    }
  },
  computed: {
    isShowLink () {
      const currentRoute = this.$store.state.app.currentRoute
      console.log(currentRoute)
      if (currentRoute !== '/home' && currentRoute !== '/ency' && currentRoute !== '/chanpindetail'
        && currentRoute !== '/discount' && currentRoute !== '/profile') {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    onChange (index) {
      this.active = index
    },
    showPopup () {
      this.show = true;
    },
  },
  components: {},
  created: function () {
  },
  beforeDestroy () {

  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 0.12rem;

  .icon-close {
    position: absolute;
    right: 0.1rem;
    top: 0;
    top: 20px;
    color: #999;
    font-size: 20px;
  }

  .erweima {
    margin-top: 0.2rem;
    padding: 0.1rem;
    box-sizing: border-box;
    text-align: center;

    & > img:nth-child(1) {
      border-bottom: 1px solid #ddd;
      height: 1.4rem;
    }
    & > img:nth-child(2) {
      margin: 0.4rem 0;
      width: 1.2rem;
    }
  }
}
</style>
