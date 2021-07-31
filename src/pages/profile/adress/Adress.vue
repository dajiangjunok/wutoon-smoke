<template>
  <div class="change-adress">
    <NavBar :isBack="true"
            :title="isAdd==1?'新增地址':'编辑地址'" />
    <van-form @submit="onSubmit">
      <!-- 收货人 -->
      <van-field v-model="form.nickname"
                 name="nickname"
                 label="收货人"
                 placeholder="请输入"
                 :rules="[{   required: true,validator:nickNameValidator, message: '收货人长度2-12位' }]" />
      <!-- 手机号 -->
      <van-field v-model="form.mobile"
                 name="mobile"
                 label="手机号"
                 placeholder="手机号"
                 :rules="[{required:true, validator:validatorPhone, message: '请填写正确的手机号' }]" />
      <!-- 地区 -->
      <van-field v-model="addressValue"
                 is-link
                 readonly
                 label="地区"
                 placeholder="请选择所在地区"
                 @click="show = true" />
      <van-popup v-model="show"
                 round
                 position="bottom">
        <van-cascader v-model="cascaderValue"
                      title="请选择所在地区"
                      :options="addressOptions"
                      @close="show = false"
                      @change="onChange"
                      @finish="onFinish" />
      </van-popup>
      <!-- 详细地址 -->
      <van-field v-model="form.address"
                 name="address"
                 label="详细地址"
                 placeholder="详细地址"
                 :rules="[{   required: true, message: '请填写详细地址' }]" />
      <div class="flex-between "
           style="height:44px;padding:0 16px">
        <span class="t-14"
              style="color: #646566;">设为默认地址</span>
        <van-switch v-model="form.isDefault"
                    size="20px" />
      </div>

      <div style="margin: 24px 16px;">
        <van-button block
                    type="info"
                    native-type="submit">{{isAdd==1?'添加':'保存'}}</van-button>
      </div>
    </van-form>

  </div>
</template>

<script>
const initForm = () => {
  return {
    nickname: '',
    mobile: '',
    provinceId: '',
    cityId: '',
    areaId: '',
    streetId: '',
    address: '',
    isDefault: '',
  }
}
import NavBar from '@/components/base/NavBar.vue'

import { getAddressById, addAddress, editAddress, getAddressOne } from '@/services/services_address'

export default {
  name: "Adress",
  props: {

  },
  data () {
    return {
      isAdd: '1', //1是添加  0是编辑
      form: initForm(),
      addressValue: '',
      show: false,
      addressOptions: [],
      cascaderValue: '',
      currentIndexArr: []
    }
  },
  methods: {
    // 昵称验证
    nickNameValidator (val) {
      return val.length > 1 && val.length < 13
    },
    validatorPhone (val) {
      return /^1[3|4|5|8][0-9]\d{4,8}$/.test(val)
    },
    async onSubmit () {
      if (this.isAdd == '1') {
        // 添加操作
        const data = { ...this.form, userId: this.$store.state.app.userId }
        if (data.isDefault) {
          data.isDefault = 1
        } else {
          data.isDefault = 0
        }
        const res = await addAddress(data)
        if (res.code != 0) {
          this.$toast(res.msg)
        } else {
          this.$toast('添加成功')
          setTimeout(() => {
            this.$router.back(-1)
          }, 500)
        }
      } else {
        // 编辑操作
        const data = { ...this.form, userId: this.$store.state.app.userId, id: this.$route.query.id }
        if (data.isDefault) {
          data.isDefault = 1
        } else {
          data.isDefault = 0
        }
        const res = await editAddress(data)
        if (res.code != 0) {
          this.$toast(res.msg)
        } else {
          this.$toast('保存成功')
          setTimeout(() => {
            this.$router.back(-1)
          }, 500)
        }
      }
    },
    async onChange ({ value, selectedOptions, tabIndex }) {
      const index = selectedOptions[tabIndex].index
      if (typeof index == 'undefined') return

      const res = await getAddressById(value)

      if (res.code == 0) {
        const option = res.data.map((item, index) => {

          if (item.level > 3 || (selectedOptions[2] && selectedOptions[2].value == item.id)) {

            return { text: item.name, value: item.id }
          } else {
            return { text: item.name, value: item.id, level: item.level, index: index, children: [] }
          }
        })

        switch (tabIndex) {
          case 0:
            this.currentIndexArr[0] = index
            this.addressOptions[this.currentIndexArr[0]].children = option
            break;
          case 1:
            this.currentIndexArr[1] = index
            this.addressOptions[this.currentIndexArr[0]].children[this.currentIndexArr[1]].children = option
            break;
          case 2:
            this.currentIndexArr[2] = index
            this.addressOptions[this.currentIndexArr[0]].children[this.currentIndexArr[1]].children[this.currentIndexArr[2]].children = option
            break;
          case 3:
            this.currentIndexArr[3] = index
            this.addressOptions[this.currentIndexArr[0]].children[this.currentIndexArr[1]].children[this.currentIndexArr[2]].children[this.currentIndexArr[3]].children = option
            break;
          default:
            break;
        }
      }
    },
    onFinish ({ selectedOptions }) {
      this.show = false;
      this.addressValue = selectedOptions.map((option) => option.text).join('/');

      this.form.provinceId = selectedOptions[0].value
      this.form.cityId = selectedOptions[1].value
      this.form.areaId = selectedOptions[2].value
      this.form.streetId = selectedOptions[3].value
    },
  },
  async created () {
    this.isAdd = this.$route.query.isAdd
    const res = await getAddressById(0)

    if (res.code == 0) {
      this.addressOptions = res.data.map((item, index) => {
        return { text: item.name, value: item.id, index: index, level: item.level, children: [] }
      })
    }

    if (this.isAdd == 1) return
    // debugger
    let addressRes = addressRes = await getAddressOne(this.$route.query.id)

    if (addressRes.code == 0) {
      // console.log(addressRes.data);
      const data = { ...addressRes.data }
      this.cascaderValue = `${data.provinceName}/${data.cityName}/${data.areaName}/${data.streetName}`
      this.form.nickname = data.nickname
      this.form.mobile = data.mobile
      this.form.provinceId = data.provinceId
      this.form.cityId = data.cityId
      this.form.areaId = data.areaId
      this.form.streetId = data.streetId
      this.form.address = data.address
      this.form.isDefault = data.isDefault == 1 ? true : false
    }
  },
  components: {
    NavBar
  }
}
</script>

<style scoped lang="scss">
</style>