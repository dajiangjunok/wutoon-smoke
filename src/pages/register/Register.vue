<template>
  <div class="register">
    <div class="header">
      <img style="width:100%"
           src="~@/assets/img/logo.png"
           alt="logo">
    </div>
    <!-- 注册 -->
    <div class="content">
      <h2 style="margin-bottom:30px">注册</h2>
      <van-form @submit="onRegister">
        <!-- <van-field v-model="inviteParam"
                   name="inviteParam"
                   label="邀请注册码"
                   placeholder="请输入邀请注册码" /> -->
        <van-field v-model="username"
                   name="userName"
                   label="用户名"
                   placeholder="用户名"
                   :rules="[{ required: true,validator:userNameValidator, message: '用户名2-12位' }]" />
        <van-field v-model="mobile"
                   name="mobile"
                   label="手机号"
                   placeholder="手机号"
                   :rules="[{required:true, validator:validatorPhone, message: '请填写正确的手机号' }]" />
        <van-field v-model="password"
                   type="password"
                   name="password"
                   label="密码"
                   placeholder="密码"
                   :rules="[{ required: true,validator:validatorPassword, message: '密码6-12位' }]" />

        <div style="margin:40px 16px 16px;">
          <van-checkbox v-model="checked"
                        style="margin-bottom:36px; font-size:0.14rem;"
                        shape="square"
                        checked-color="#000">我已满18岁</van-checkbox>
          <van-button block
                      :disabled="!checked||!username||!password"
                      color="#000"
                      type="info"
                      native-type="register">注册</van-button>
          <div class="margin-top-10 t-center t-14"
               @click="handleLogin">登录</div>
          <div class="xie-yi"
               style="margin-top: 0.3rem;">
            <span>登录代表同意 </span>
            <span>雾桐用户协议</span>
          </div>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { login, register } from '../../services/services_user'
export default {
  name: "Register",
  components: {

  },
  mixins: [],
  props: {

  },
  data: function () {
    return {
      inviteParam: '',
      username: '',
      password: '',
      mobile: '',
      checked: false,
    }
  },
  created: function () {

  },
  mounted: function () {

  },
  computed: {

  },
  methods: {
    // 验证
    // 用户名验证
    userNameValidator (val) {
      return val.length > 2 && val.length < 13
    },
    validatorPassword (val) {
      return val.length > 5 && val.length < 13
    },
    // (/^1[3456789]d{9}$/.test(phone)
    validatorPhone (val) {
      return /^1[3|4|5|8][0-9]\d{4,8}$/.test(val)
    },
    async onLogin (values) {
      if (!this.checked) {
        this.$toast.fail('请确认您已成年');
      }
      values.password = window.btoa(values.password)
      console.log(values);
      const res = await login(values)
      if (res.code != 0) {
        this.$toast(res.msg);
      } else {
        this.$store.commit('app/updateToken', res.data.token)
        this.$store.commit('app/updateUserId', res.data.userId)
        this.$router.replace('/home')
      }
    },
    async onRegister (values) {
      // console.log(values);
      const data = { ...values, inviteFlag: false }

      // 拿url地址看query后有没有拼接inviteParam
      const index = window.location.href.indexOf('?')
      let query = ''
      if (index != -1) {
        query = window.location.href.substring(index + 1)
      }

      if (query) {
        data.inviteFlag = true
        data.inviteParam = query
      }
      data.password = window.btoa(data.password)
      const res = await register(data)
      if (res.code != 0) {
        this.$toast(res.msg);
      } else {
        const data = { userName: values.userName, password: values.password }
        this.$toast.success('注册成功');
        setTimeout(() => {
          this.onLogin(data)
        }, 2000)
      }
    },
    handleLogin () {
      this.$router.replace('/')
    }
  }
}
</script>

<style scoped lang="scss">
.register {
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
