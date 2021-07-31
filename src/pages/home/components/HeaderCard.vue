<template>
  <div class="header-card">
    <div class="info-header">
      <div class="h-left">
        <h3 style="margin-left:2px;">SVIP</h3>
        <h2>会员中心</h2>
      </div>
      <div class="h-right">
        <img v-if="$store.state.app.userInfo.avatarImgUrl"
             :src="$store.state.app.userInfo.avatarImgUrl"
             class="header-photo" />
        <img v-else
             src="~@/assets/img/h-photo.png"
             class="header-photo" />
        <div class="h-name">
          <span class="t-16 padding-bottom-10">雾桐会员</span>
          <span class="margin-top-10">{{userInfo.nickName||'匿名用户'}}</span>
        </div>
      </div>
    </div>
    <div class="info-line">
      <van-slider :value="lineValue"
                  bar-height="6px"
                  button-size="0px"
                  active-color="#d6b33b">
      </van-slider>
    </div>
    <div class="info-bottom">
      <div class="b-left">
        <!-- <span>我的积分 <span class="t-bold">10</span>/500</span> -->
        <span>已邀 <span class="t-bold">{{userCount}}</span>人</span>
        <!-- <span>我的积分 <span class="t-bold">10</span></span> -->
      </div>
      <div class="b-right">
        <div @click="linkToProfile">查看个人详情&gt;</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: "HeaderCard",
  // props: {

  // },
  data () {
    return {
      integral: 320
    }
  },
  computed: {
    ...mapState('app', ['userInfo', 'userCount']),
    lineValue () {
      // return this.integral / 500 * 100
      return 100
    }
  },
  methods: {
    linkToProfile () {
      this.$router.push('/profile')
    }
  }
}
</script>

<style scoped lang="scss">
h2,
h3 {
  padding: 0;
  margin: 0;
}
.header-card {
  display: flex;
  /* justify-content: space-evenly; */
  flex-direction: column;
  padding: 0.1rem;
  height: 1.4rem;
  // width: 3.55rem;
  background-color: #e6e7e9;
  border-radius: 0.2rem;
  box-sizing: border-box;

  .info-header {
    flex: 4;
    /* height: 0.4rem; */
    display: flex;
    justify-content: space-between;

    .h-left {
      display: flex;
      justify-content: space-evenly;
      flex-direction: column;
      color: #d6b33b;
      /* align-items: center; */
    }
    .h-right {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .h-name {
        margin-left: 0.1rem;
        display: flex;
        justify-content: space-evenly;
        flex-direction: column;
      }

      .header-photo {
        width: 0.44rem;
        height: 0.44rem;
        border-radius: 50%;
        border: 1px solid #fff;
        overflow: hidden;
      }
    }
  }

  .info-line {
    flex: 1;
    padding: 0.1rem 0.02rem;
    box-sizing: border-box;

    ::v-deep .van-slider {
      border: 1px solid #d6b33b;
    }
  }

  .info-bottom {
    flex: 3;
    display: flex;
    justify-content: space-between;

    .b-left {
      display: flex;
      justify-content: space-evenly;
      flex-direction: column;
    }

    .b-right {
      & > div {
        margin-top: 0.1rem;
        color: #fff;
        padding: 0.05rem 0.1rem;
        box-sizing: border-box;
        background-color: #cdced0;
        border-radius: 0.2rem;
      }
    }
  }
}
</style>