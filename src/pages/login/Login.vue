<template>
  <div class="login">
    <div class="header">
      <img style="width:100%"
           src="~@/assets/img/logo.png"
           alt="logo">
    </div>
    <!-- 登录 -->
    <div class="content">
      <h2 style="margin-bottom:30px">登录</h2>
      <van-form @submit="onLogin">
        <van-field v-model="username"
                   name="userName"
                   label="用户名"
                   placeholder="用户名"
                   :rules="[{ required: true, message: '请填写用户名' }]" />
        <van-field v-model="password"
                   type="password"
                   name="password"
                   label="密码"
                   placeholder="密码"
                   :rules="[{ required: true, message: '请填写密码' }]" />

        <div style="margin:40px 16px 16px;">
          <van-checkbox v-model="checked"
                        style="margin-bottom:36px; font-size:0.14rem;"
                        shape="square"
                        checked-color="#000">我已满18岁</van-checkbox>
          <van-button block
                      :disabled="!checked||!username||!password"
                      color="#000"
                      type="info"
                      native-type="submit">登录</van-button>
          <div class="margin-top-10 t-center t-14"
               @click="handleRegister">注册</div>
          <div class="xie-yi">
            <span>登录代表同意 </span>
            <span>雾桐用户协议</span>
          </div>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { login } from '../../services/services_user'
export default {
  name: "Login",
  components: {

  },
  mixins: [],
  props: {

  },
  data: function () {
    return {
      username: '',
      password: '',
      checked: false,
    }
  },
  created: function () {
    // 清空store中app下数据
    this.$store.commit('app/clearUser')
  },
  mounted: function () {

  },
  computed: {

  },
  methods: {
    async onLogin (values) {
      if (!this.checked) {
        this.$toast.fail('请确认您已成年');
      }
      values.password = window.btoa(values.password)
      // console.log(values);
      const res = await login(values)
      if (res.code != 0) {
        this.$toast(res.msg);
      } else {
        this.$store.commit('app/updateToken', res.data.token)
        this.$store.commit('app/updateUserId', res.data.userId)
        // this.$store.commit('app/updateVerified', res.data.verified)
        this.$store.dispatch('app/getUserInfo').then((res) => {
          console.log(res);
          if (res) {
            this.$router.replace('/home')
          } else {
            this.$router.replace('/idcard')
          }
        })
      }
    },

    handleRegister () {
      this.$router.replace('/register')
    },
  }
}
</script>

<style scoped lang="scss">
.login {
  height: 100vh;
  overflow: auto;
  .header {
    padding-bottom: 0.2rem;
    height: 2rem;
    background-color: #000;
  }
  .content {
    position: relative;
    top: -0.7rem;
    left: 50%;
    transform: translateX(-50%);
    padding: 0.2rem 0.1rem;
    width: 3.4rem;
    background-color: #fff;
    min-height: 2rem;
    box-shadow: 0 0.8vw 1.6vw rgba(0, 0, 0, 0.16);
    border-radius: 3.2vw;
    box-sizing: border-box;
  }

  .xie-yi {
    margin-top: 0.8rem;
    font-size: 0.12rem;
    text-align: center;

    & > span:nth-child(1) {
      color: rgb(153, 153, 153);
    }
    & > span:nth-child(2) {
      font-weight: bold;
    }
  }
}
</style>
