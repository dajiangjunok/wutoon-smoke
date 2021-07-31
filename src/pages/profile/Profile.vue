<template>
  <div class="profile">
    <NavBar title="我的" />
    <div class="card padding-10 border-bottom">
      <ProfileCard />
    </div>
    <div class="content-list">
      <div @click="onLink(0,'修改个人信息')">
        <div>
          <i class="iconfont icon-gerenxinxi margin-right-10 color-primary t-18"></i>
          <span>修改个人信息</span>
        </div>
        <van-icon name="arrow"
                  color="#c79d68" />
      </div>
      <div @click="onLink(2,'收货地址管理')">
        <div>
          <i class="iconfont icon-dizhi margin-right-10 color-primary  t-18"></i>
          <span>收货地址管理</span>
        </div>
        <van-icon name="arrow"
                  color="#c79d68" />
      </div>
      <div @click="onLink(1,'修改密码')">
        <div>
          <i class="iconfont icon-xiugaimima margin-right-10 color-primary  t-18"></i>
          <span>修改密码</span>
        </div>
        <van-icon name="arrow"
                  color="#c79d68" />
      </div>
      <div @click="onLink(4,'留言反馈')">
        <div>
          <i class="iconfont icon-tubiao- margin-right-10 color-primary  t-18"></i>
          <span>留言反馈</span>
        </div>
        <van-icon name="arrow"
                  color="#c79d68" />
      </div>

      <div v-show="approveStatus.length == 0"
           @click="onLink(3,'申请成为商家')">
        <div>
          <i class="iconfont icon-shangjiaruzhu margin-right-10 color-primary  t-18"></i>
          <span>申请成为商家</span>
        </div>
        <van-icon name="arrow"
                  color="#c79d68" />
      </div>

      <div v-show="approveStatus==2">
        <div>
          <i class="iconfont icon-shangjiaruzhu margin-right-10 color-primary  t-18"></i>
          <span>后台审核中...</span>
        </div>
        <van-icon name="arrow"
                  color="#c79d68" />
      </div>
      <div v-show="approveStatus==3 && approveStatus.length!=0"
           @click="onLink(3,'申请成为商家')">
        <div>
          <i class="iconfont icon-shangjiaruzhu margin-right-10 color-primary  t-18"></i>
          <span>重新发起</span>
        </div>
        <van-icon name="arrow"
                  color="#c79d68" />
      </div>
      <div v-show="approveStatus==1"
           @click="onLinkShop">
        <div>
          <i class="iconfont icon-shangjiaruzhu margin-right-10 color-primary  t-18"></i>
          <span>商家后台</span>
        </div>
        <van-icon name="arrow"
                  color="#c79d68" />
      </div>

      <van-button class="logout"
                  style="margin-top:30px"
                  type="danger"
                  block
                  plain
                  @click="onLogout">退出登录</van-button>
    </div>

  </div>
</template>

<script>
import NavBar from '@/components/base/NavBar.vue'
import ProfileCard from './components/ProfileCard.vue'

import { logout } from '../../services/services_user'
import { mapState } from 'vuex'

export default {
  name: "profile",
  mixins: [],
  props: {

  },
  data: function () {
    return {
      message: "Hello profile"
    }
  },
  created: function () {
    this.$store.dispatch('app/getApprove')
  },
  mounted: function () {

  },
  computed: {
    ...mapState('app', ['approveStatus'])
  },
  methods: {
    async onLogout () {
      try {
        const res = await logout()
        if (res.code != 0) {
          this.$toast(res.msg)
        } else {
          // 清空store中app下数据
          this.$store.commit('app/clearUser')
          this.$router.replace('/')
        }
      } catch (error) {
        console.log(error);
      }

    },
    onLinkShop () {
      this.$router.push({
        path: '/shopadmin'
      })
    },
    /**
     * index 索引 0 是修改个人信息 1是修改密码
     * title 标题
     */
    onLink (index, title) {
      this.$router.push({
        path: '/profileinfo',
        query: {
          title: title,
          type: index
        }
      })
    }
  },
  components: {
    NavBar,
    ProfileCard
  }
}
</script>

<style scoped lang="scss">
.profile {
  position: relative;
  height: calc(100vh - 0.5rem);
  font-size: 0.12rem;
  overflow: auto;

  .content-list {
    padding: 0.2rem 0.4rem;
  }
  .content-list > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 0.6rem;
    line-height: 0.6rem;
    font-size: 0.16rem;
    border-bottom: 1px solid #eee;
  }
}
</style>
