<template>
  <div class="idcard">
    <NavBar :isBack="true"
            title="身份认证" />

    <van-form @submit="onSubmit">
      <!-- 昵称nickName -->
      <!-- <van-field v-model="nickName"
                 name="nickName"
                 label="昵称"
                 placeholder="昵称"
                 :rules="[{   required: true,validator:nickNameValidator, message: '昵称长度2-12位' }]" /> -->
      <!-- 头像 -->
      <!-- <van-field name="uploader"
                 label="头像上传">
        <template #input>
          <van-uploader v-model="uploader"
                        :max-count="1" />
        </template>
      </van-field> -->
      <!-- 身份证地址 -->
      <!-- <van-field readonly
                 clickable
                 name="cardAddress"
                 :value="cardAddress"
                 label="地区选择"
                 placeholder="点击选择省市区"
                 @click="showArea = true" />
      <van-popup v-model="showArea"
                 position="bottom">
        <van-area :area-list="areaList"
                  @confirm="onConfirm"
                  @cancel="showArea = false" />
      </van-popup> -->
      <!-- 身份证号 -->
      <van-field v-model="cardNumber"
                 name="cardNumber"
                 label="身份证号"
                 placeholder="身份证号"
                 :rules="[{ required:true, validator:validatorCardNumber, message: '请填写正确的身份证号' }]" />
      <!-- 真实姓名realName  -->
      <van-field v-model="realName"
                 name="realName"
                 label="真实姓名"
                 placeholder="真实姓名"
                 :rules="[{   required: true, message: '请填写真实姓名' }]" />
      <!-- email -->
      <!-- <van-field v-model="email"
                 name="email"
                 label="邮箱"
                 placeholder="邮箱"
                 :rules="[{ required:true, validator:validatorEmail, message: '请填写正确的邮箱' }]" /> -->
      <div style="margin: 24px 16px;">
        <van-button block
                    type="info"
                    native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import NavBar from '@/components/base/NavBar.vue'
import { areaList } from '@vant/area-data';

import { prove } from '../../services/services_user'

export default {
  name: "IdCard",
  components: {
    NavBar
  },
  mixins: [],
  props: {

  },
  data: function () {
    return {
      // uploader: [],
      // cardAddress: '',
      // showArea: false,
      // areaList: areaList, // 数据格式见 Area 组件文档
      cardNumber: '',//身份证号
      // email: '',//电子邮箱
      // nickName: '',// 昵称
      realName: '',
    }
  },
  created: function () {

  },
  mounted: function () {

  },
  computed: {

  },
  methods: {
    // 昵称验证
    nickNameValidator (val) {
      return val.length > 1 && val.length < 13
    },
    // 身份证号验证
    validatorCardNumber (val) {
      return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(val)
    },
    validatorEmail (val) {
      return /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(val)
    },
    // 提交
    async onSubmit (vals) {

      try {
        const res = await prove(vals)
        if (res.code == 0) {
          this.$store.commit('app/updateVerified', true)
          this.$router.replace({ path: '/home' })
        } else {
          this.$toast(res.msg)
        }
      } catch (error) {
        console.log(error);
      }
    },
    onConfirm (values) {
      this.cardAddress = values
        .filter((item) => !!item)
        .map((item) => item.name)
        .join('/');
      this.showArea = false;
    },
  }
}
</script>

<style scoped lang="scss">
.idcard {
  font-size: 0.12rem;
}
</style>
