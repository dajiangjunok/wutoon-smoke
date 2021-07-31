<template>
  <div class="profile-info">
    <NavBar :isBack="true"
            :title="title" />
    <!-- 修改个人信息 -->
    <div class="change-info"
         v-if="type==0">
      <van-form @submit="onChangeInfo">
        <van-field name="uploader"
                   v-model="avatarImg"
                   label="头像上传">
          <template #input>
            <van-uploader v-model="uploader"
                          max-count="1"
                          :after-read="afterRead" />
          </template>
        </van-field>

        <van-field v-model="nickName"
                   name="nickName"
                   label="昵称"
                   placeholder="昵称"
                   :rules="[{  required:true, validator:nickNameValidator, message: '昵称长度2-12位' }]" />
        <van-field v-model="mobile"
                   name="mobile"
                   label="手机号"
                   placeholder="手机号"
                   :rules="[{required:true, validator:validatorPhone, message: '请填写正确的手机号' }]" />
        <van-button class="submit"
                    block
                    type="info"
                    plain
                    native-type="submit">确认</van-button>
      </van-form>
    </div>
    <!-- 修改地址 ----------------------------------->
    <div class="change-adress"
         v-if="type==2">
      <div class="adress-item"
           v-for="item in mapAddresList"
           :key="item.id">
        <div>
          <span class="t-bold t-14">{{item.nickname}}</span>
          <span class="color-9">{{item.mobile}}</span>
        </div>
        <div class="moren-adress">
          <span>
            <span class="moren"
                  v-show="item.isDefault==1">默认</span>
          </span>
          <span>{{item.provinceName}} {{item.cityName}} {{item.areaName}} {{item.streetName}} {{item.address}}</span>
          <span>
            <van-icon name="edit"
                      @click="onEditAdress(item.id)"
                      class="t-18"
                      color="#999" />
            <van-icon name="delete-o"
                      @click="onDeleteAdress(item.id)"
                      class="t-18"
                      color="#999" />
          </span>
        </div>
      </div>
      <van-button type="primary"
                  class="margin-top-10"
                  block
                  color="#ee0a24"
                  size="small"
                  @click="onAddAdress"
                  round>+ 添加收货地址</van-button>
    </div>
    <!-- 修改密码 ----------------------------------->
    <div class="change-password"
         v-if="type==1">
      <van-form @submit="onChangePassword">
        <van-field v-model="password"
                   type="password"
                   name="password"
                   label="原密码"
                   placeholder="原密码"
                   :rules="[{ required: true, message: '请输入原密码' }]" />
        <van-field v-model="newPassword"
                   type="password"
                   name="newPassword"
                   label="新密码"
                   placeholder="新密码"
                   :rules="[{ required: true,validator:validatorPassword, message: '密码6-12位' }]" />
        <van-field v-model="confirmPassword"
                   type="password"
                   name="confirmPassword"
                   label="再次确认密码"
                   placeholder="再次确认密码"
                   :rules="[{ required: true,validator:validatorPassword, message: '密码6-12位' }]" />
        <van-button class="submit"
                    block
                    type="info"
                    plain
                    native-type="submit">确认</van-button>
      </van-form>
    </div>
    <!-- 留言反馈 -->
    <div class="change-suggest"
         v-if="type==4">
      <van-field v-model="message"
                 rows="3"
                 autosize
                 label="留言"
                 type="textarea"
                 maxlength="150"
                 placeholder="请输入留言"
                 show-word-limit />

      <van-button class="submit"
                  style="padding-right-10"
                  block
                  type="info"
                  @click="addMessage"
                  plain>提交</van-button>
    </div>
    <!-- 申请成为商家 -------------------------------->
    <div class="cheng-wei-shang-jia"
         v-if="type==3">
      <van-form @submit="onApply">
        <van-field name="uploaderStoreImg"
                   v-model="shopDetailUrl"
                   label="门店图片">
          <template #input>
            <van-uploader v-model="uploaderStoreImg"
                          max-count="6"
                          :after-read="afterReadStore" />
          </template>
        </van-field>

        <van-field v-model="applyForm.name"
                   name="name"
                   label="店铺名"
                   placeholder="店铺名"
                   :rules="[{ required: true, message: '请输入店铺名' }]" />

        <van-field v-model="applyForm.wechat"
                   name="wechat"
                   label="微信号"
                   placeholder="微信号"
                   :rules="[{ required: true, message: '请输入微信号' }]" />

        <van-field v-model="applyForm.personName"
                   name="personName"
                   label="姓名"
                   placeholder="姓名"
                   :rules="[{ required: true, message: '请输入注册人姓名' }]" />

        <van-field v-model="applyForm.cardNumber"
                   name="cardNumber"
                   label="身份证号码"
                   placeholder="身份证号码"
                   :rules="[{ required:true, validator:validatorCardNumber, message: '请填写正确的身份证号' }]" />

        <van-field v-model="applyForm.phone"
                   name="phone"
                   label="手机号码"
                   placeholder="手机号码"
                   :rules="[{required:true, validator:validatorPhone, message: '请填写正确的手机号' }]" />
        <!-- 营业开始时间 -->
        <van-field readonly
                   clickable
                   name="datetimePicker"
                   :value="applyForm.businessStartTime"
                   label="营业开始时间"
                   placeholder="点击选择时间"
                   @click="startTimeShow = true" />
        <van-popup v-model="startTimeShow"
                   position="bottom">
          <van-datetime-picker type="time"
                               @confirm="onStartTimeConfirm"
                               @cancel="startTimeShow = false" />
        </van-popup>
        <!-- 营业结束时间 -->
        <van-field readonly
                   clickable
                   name="datetimePicker"
                   :value="applyForm.businessEndTime"
                   label="营业结束时间"
                   placeholder="点击选择时间"
                   @click="endTimeShow = true" />
        <van-popup v-model="endTimeShow"
                   position="bottom">
          <van-datetime-picker type="time"
                               @confirm="onEndTimeConfirm"
                               @cancel="endTimeShow = false" />
        </van-popup>

        <van-field v-model="addressValue"
                   :rules="[{ required: true, message: '请选择地区' }]"
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

        <van-field v-model="applyForm.detailAddress"
                   name="detailAddress"
                   label="具体地址"
                   placeholder="具体地址"
                   :rules="[{ required: true, message: '请输入具体地址' }]" />

        <van-field readonly
                   clickable
                   name="picker"
                   :value="storeType"
                   label="店铺类型"
                   placeholder="点击选择店铺类型"
                   :rules="[{ required: true, message: '请选择地区' }]"
                   @click="showTypePicker = true" />
        <van-popup v-model="showTypePicker"
                   position="bottom">
          <van-picker show-toolbar
                      value-key="val"
                      :columns="typeOptions"
                      @confirm="onConfirm"
                      @cancel="showTypePicker = false" />
        </van-popup>
        <!-- <SelectMultiple /> -->
        <van-field readonly
                   clickable
                   name="picker"
                   :value="storeLabel"
                   label="店铺标签"
                   placeholder="点击选择店铺标签"
                   :rules="[{ required: true, message: '请选择店铺标签' }]"
                   @click="showlabelPicker = true" />
        <van-popup v-model="showlabelPicker"
                   position="bottom">
          <!-- <van-picker show-toolbar
                      value-key="val"
                      :columns="storeLabelOption"
                      @confirm="onConfirmLable"
                      @cancel="showlabelPicker = false" /> -->
          <div class="flex-between color-6 t-14 padding-10">
            <span @click="onCancelCheck">取消</span>
            <span @click="onSubmitCheck">确定</span>
          </div>
          <div class="label-container">
            <van-checkbox-group v-model="applyForm.labelIdList">
              <van-cell-group>
                <van-cell v-for="(item, index) in storeLabelOption"
                          clickable
                          :key="item.id"
                          :title="`${item.val}`"
                          @click="toggle(index)">
                  <template #right-icon>
                    <van-checkbox :name="item"
                                  ref="checkboxes" />
                  </template>
                </van-cell>
              </van-cell-group>
            </van-checkbox-group>
          </div>

        </van-popup>

        <!-- 是否支持配送 -->
        <van-field readonly
                   clickable
                   name="picker"
                   :value="supportDeliveryLabel"
                   label="是否配送"
                   placeholder="是否支持配送"
                   :rules="[{ required: true, message: '请选择是否支持配送' }]"
                   @click="showSupportDelivery = true" />
        <van-popup v-model="showSupportDelivery"
                   position="bottom">
          <van-picker show-toolbar
                      value-key="val"
                      :columns="supportDeliveryOption"
                      @confirm="onSupportDeliveryConfirm"
                      @cancel="showSupportDelivery = false" />
        </van-popup>
        <div style="margin: 16px;">
          <van-button block
                      type="info"
                      native-type="submit">提交</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/base/NavBar.vue'
// import SelectMultiple from '@/components/common/SelectMultiple.vue'

import { updateUserBaseInfo, updateUserPassWord, } from '@/services/services_user.js'
import { getAddressAll, deleteAddress } from '../../../services/services_address'
import { getAddressById } from '@/services/services_address'
import { addShop } from '@/services/services_shop'

import { uploadFile } from '../../../services/services_file'
import { getDicList } from '../../../services/services_dictionary'
import { addSuggest } from '../../../services/services_user'

import { mapGetters, mapState } from 'vuex'

const initApplyForm = () => {
  return {
    // id:'',
    businessEndTime: "",//营业结束时间
    businessStartTime: "",//营业开始时间
    // yinYeStartTime: "",//营业开始时间
    // yinYeEndTime: "",//营业结束时间
    cardNumber: "", //身份证号
    detailAddress: "",//详细地址
    evaluateScore: "5",//店铺评分
    // id: 0,
    // goodsList: [], //商品列表
    level1AddressCode: null,//省
    level2AddressCode: null,//市
    level3AddressCode: null,//区
    name: "",//店铺名
    personName: "",//店长名
    phone: "",//电话
    type: "",//店铺类型
    wechat: "",//微信
    supportDelivery: 0,
    shopDetailUrls: [],//店内图
    labelIdList: [], //店铺标签
    // productIdList: [], //店铺产品

  }
}
export default {
  name: "ProfileInfo",
  data () {
    return {
      title: "",
      type: "",// 0是修改基础信息  1是修改密码
      // 用户信息表单数据
      nickName: '',
      mobile: '',
      avatarImg: '',
      uploader: [],
      // 用户密码表单信息
      password: '',
      newPassword: '',
      confirmPassword: '',
      // 地址表单信息
      addressList: [],
      addressValue: '', // 绑定地址
      cascaderValue: '',
      addressOptions: [],
      currentIndexArr: [],
      show: false,
      applyForm: initApplyForm(),
      showPicker: false,
      storeLabel: '',
      storeType: '',
      typeOptions: [
        { val: "授权店", id: "AUTH_STORE" },
        { val: "专卖店", id: "MONOPOLY_STORE" },
        { val: "配送点", id: "BIZ_POINT" }
      ],
      supportDeliveryLabel: '',
      supportDeliveryOption: [
        { val: "支持", id: 1 },
        { val: "不支持", id: 0 },
      ],
      showSupportDelivery: false,
      startTimeShow: false,
      endTimeShow: false,
      showlabelPicker: false,
      showTypePicker: false,
      // 门店图
      uploaderStoreImg: [],
      shopDetailUrl: '',
      storeLabelOption: [],
      message: '',//留言
    }
  },
  computed: {
    ...mapGetters('address', ['mapAddresList']),
    ...mapState('app', ['approveStatus'])
  },
  methods: {
    toggle (index) {
      this.$refs.checkboxes[index].toggle();
    },
    onSubmitCheck () {
      this.storeLabel = ''
      let storeLabel = ''
      this.applyForm.labelIdList = this.applyForm.labelIdList.map(item => {
        storeLabel = storeLabel + item.val + '/'
        return item.id
      })
      this.storeLabel = storeLabel
      this.showlabelPicker = false
    },
    onCancelCheck () {
      this.applyForm.labelIdList = []
      this.storeLabel = ''
      this.showlabelPicker = false
    },
    // 时间选中
    onStartTimeConfirm (value) {
      this.applyForm.businessStartTime = value
      this.startTimeShow = false
    },
    onEndTimeConfirm (value) {
      this.applyForm.businessEndTime = value
      this.endTimeShow = false
    },
    async afterRead (file) {
      // 此时可以自行将文件上传至服务器
      const formData = new FormData()
      formData.append('file', file.file)
      // console.log(formData);
      const res = await uploadFile(formData)
      // console.log(res);
      if (res.code == 0) {
        this.avatarImg = res.data.id
      } else {
        this.$toast(res.msg)
      }
    },
    // 上传店铺文件
    async afterReadStore (file, data) {
      const formData = new FormData()
      formData.append('file', file.file)
      // console.log(formData);
      const res = await uploadFile(formData)
      // console.log(res);
      if (res.code == 0) {
        this.applyForm.shopDetailUrls.push(res.data.id)
      } else {
        this.$toast(res.msg)
      }
    },
    deleteReadStore (file, data) {
      this.applyForm.shopDetailUrls.splice(data.index, 1)
    },
    async onChangeInfo (vals) {
      const data = { mobile: this.mobile, nickName: this.nickName, avatarImg: this.avatarImg }

      try {
        const res = await updateUserBaseInfo(data)
        if (res.code != 0) {
          this.$toast(res.msg)
        } else {
          this.$toast('修改成功')
          this.$store.dispatch('app/getUserInfo', this.$store.state.app.userId)
          this.$router.back(-1)
        }
      } catch (error) {
        console.log(error);
      }
    },
    async onChangePassword (vals) {
      const values = { ...vals }
      values.password = window.btoa(this.password)
      values.newPassword = window.btoa(this.newPassword)
      values.confirmPassword = window.btoa(this.confirmPassword)
      try {
        const res = await updateUserPassWord(values)
        if (res.code != 0) {
          this.$toast(res.msg)
        } else {
          this.$toast('修改成功')
          this.$router.replace('/')
        }
      } catch (error) {
        console.log(error);
      }
    },
    async onChange ({ value, selectedOptions, tabIndex }) {
      const index = selectedOptions[tabIndex].index
      if (typeof index == 'undefined') return

      const res = await getAddressById(value)

      if (res.code == 0) {
        const option = res.data.map((item, index) => {

          if (item.level > 2 || (selectedOptions[2] && selectedOptions[2].value == item.id)) {

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
          // case 3:
          //   this.currentIndexArr[3] = index
          //   this.addressOptions[this.currentIndexArr[0]].children[this.currentIndexArr[1]].children[this.currentIndexArr[2]].children[this.currentIndexArr[3]].children = option
          // break;
          default:
            break;
        }
      }
    },
    onFinish ({ selectedOptions }) {
      this.show = false;
      this.addressValue = selectedOptions.map((option) => option.text).join('/');

      this.applyForm.level1AddressCode = selectedOptions[0].value
      this.applyForm.level2AddressCode = selectedOptions[1].value
      this.applyForm.level3AddressCode = selectedOptions[2].value
      // this.form.streetId = selectedOptions[3].value
    },
    onConfirm (data) {
      this.applyForm.type = data.id
      this.storeType = data.val
      this.showTypePicker = false;
    },
    onConfirmLable (data) {
      this.applyForm.labelIdList = [data.id]
      this.storeLabel = data.val
      this.showlabelPicker = false;
    },
    onSupportDeliveryConfirm (data) {
      this.applyForm.supportDelivery = data.id
      this.supportDeliveryLabel = data.val
      this.showSupportDelivery = false;
    },
    // 申请成为商家  提交店铺申请
    async onApply () {
      const res = await addShop(this.applyForm)
      if (res.code == 0) {
        this.$toast('提交成功')
        this.$router.back(-1)
      } else {
        this.$toast(res.msg)
      }
    },
    nickNameValidator (val) {
      return val.length > 1 && val.length < 13
    },
    validatorPhone (val) {
      return /^1[3|4|5|8][0-9]\d{4,8}$/.test(val)
    },
    validatorPassword (val) {
      return val.length > 5 && val.length < 13
    },
    // 身份证号验证
    validatorCardNumber (val) {
      return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(val)
    },
    //添加新地址
    onAddAdress () {
      this.$router.push({
        path: '/adress',
        query: {
          isAdd: '1'
        }
      })
    },
    onEditAdress (id) {
      this.$router.push({
        path: '/adress',
        query: {
          isAdd: '0',
          id: id
        }
      })
    },
    onDeleteAdress (id) {
      this.$dialog.confirm({
        message: '确定要删除改地址吗?',
      })
        .then(async () => {

          const res = await deleteAddress({ ids: [id] })
          if (res.code != 0) {
            this.$toast(res.msg)
          } else {
            this.$toast('删除成功')
            this.getAddressList()
          }
          // on confirm
        })
        .catch(() => {
          // on cancel
        });
    },
    // 获取列表地址
    async getAddressList () {
      this.$store.dispatch('address/getAddressAll')
    },
    async getStoreLabel () {
      const res = await getDicList({
        current: 1,
        size: 999,
        label: 'shop_label'
      })
      if (res.code == 0) {
        this.storeLabelOption = res.data.records
      } else {
        this.$toast(res.msg)
      }
    },
    // 提交留言
    async addMessage () {
      if (!this.message) {
        return this.$toast('请输入留言内容')
      }
      const params = {
        userId: this.$store.state.app.userId,
        message: this.message
      }
      // this.$toast.loading({
      //   message: '加载中...',
      //   forbidClick: true,
      //   duration: 500
      // });
      const res = await addSuggest(params)
      if (res.code == 0) {
        this.$toast('提交成功')
      } else {
        this.$toast(res.msg)
      }
    }
  },
  components: {
    NavBar,
    // SelectMultiple
  },
  async created () {
    this.title = this.$route.query.title
    this.type = this.$route.query.type

    if (this.type == 2) {
      await this.getAddressList()
    }

    if (this.type == 3) {
      await this.getStoreLabel()
    }
    const res = await getAddressById(0)

    if (res.code == 0) {
      this.addressOptions = res.data.map((item, index) => {
        return { text: item.name, value: item.id, index: index, level: item.level, children: [] }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-info {
  .cheng-wei-shang-jia {
    height: calc(100vh - 40px);
    overflow: auto;
  }

  .submit {
    position: absolute;
    margin-left: 0.175rem;
    bottom: 0.2rem;
    width: 3.4rem;
    box-sizing: border-box;
  }

  .change-adress {
    padding: 0.1rem;
    background-color: #eee;
    height: calc(100vh - 38px);
    box-sizing: border-box;
    overflow: auto;
  }

  .change-adress .adress-item {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    margin-bottom: 0.1rem;
    padding: 0.1rem;
    min-height: 80px;
    border-radius: 8px;
    background-color: #fff;
    box-sizing: border-box;
  }
  .moren-adress {
    display: flex;
    justify-content: space-between;
    & > span:nth-child(2) {
      display: inline-block;
      width: 2.4rem;
      overflow: hidden;
    }

    .moren {
      background-color: rgba($color: #ee0a24, $alpha: 0.2);
      color: #ee0a24;
      padding: 2px 6px;
      border-radius: 4px;
    }
  }

  .label-container {
    max-height: 4rem;
    overflow: auto;
  }
}
</style>