<template>
  <div class="nav-link">
    <div class="link store"
         @click="link('/store')">
      <i class="iconfont icon-permissions"></i>
      <span>附近门店</span>
    </div>
    <div class="link idcard"
         @click="link('/idcard')">
      <i class="iconfont icon-Id"></i>
      <span>身份认证</span>
    </div>
    <div class="link card">
      <i class="iconfont icon-ziyuan"></i>
      <span>扫码防伪</span>
    </div>
    <div class="link car"
         @click="onInvite">
      <i class="iconfont icon-yaoqing"></i>
      <span>邀请好友</span>
    </div>
  </div>
</template>

<script>
import { getInviteFriends } from '@/services/services_userInvite'
export default {
  name: "NavLink",
  methods: {
    link (route) {
      if (route == '/idcard' && this.$store.state.app.verified) {
        return this.$toast('您已完成实名认证~')
      }
      this.$router.push({ path: route })
    },
    // 邀请用户
    async onInvite () {
      // console.log(this.$route);
      const res = await getInviteFriends()
      if (res.code == 0) {
        const http = `${window.location.origin}/html/#/register?${res.data}`
        this.$copyText(http).then(() => {
          this.$toast.success("已复制邀请链接!");
        }, (error) => {
          this.$toast("生成链接失败!");
        }
        );
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-link {
  display: flex;
  justify-content: space-between;

  .link {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0.1rem 0.1rem;
    text-align: center;

    & > i {
      margin-bottom: 0.1rem;
    }
  }

  .iconfont {
    color: #c79d6b;
    font-size: 0.3rem;
    background-color: #edeceb;
    padding: 0.1rem;
    border-radius: 0.1rem;
    /* box-sizing: border-box; */
  }
}
</style>