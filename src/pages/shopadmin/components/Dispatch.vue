<template>
  <div class="dispatch">
    <div class="un-add"
         v-show="!isAdd">
      <van-list v-model="loading"
                class="scroll"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad">
        <div class="pai-song"
             v-for="(item,index) in list"
             :key="index">
          <div class="status"
               :class="statusStyle(item.orderStatus)">
            <span>{{item.orderStatus | formatStatus}}</span>
          </div>
          <p class="flex-between">
            <span><span class="color-6">派送地址：</span>{{item.customerAddress}}</span>
          </p>
          <p> <span><span class="color-6">派送人：</span>{{item.customerName}}</span></p>

          <p class="flex-between">
            <span><span class="color-6">订单总价：</span> ￥{{item.orderPrice}}</span>
            <span><span class="color-6">联系号码：</span> {{item.phone}}</span>
          </p>
          <div>
            <span class="color-6"> 派送产品：</span>
            <span class="chanpin"
                  v-for="(item,index) in JSON.parse(item.goodsName)"
                  :key="index">{{item}}</span>
          </div>
          <div class="operation">
            <van-button plain
                        size="small"
                        hairline
                        type="primary"
                        @click.stop="edit(item)">编辑</van-button>
            <van-button plain
                        class="margin-left-10"
                        hairline
                        size="small"
                        type="danger"
                        @click.stop="remove(item)">删除</van-button>
          </div>
        </div>
      </van-list>
      <div style="padding:0  0.2rem">
        <van-button type="info"
                    @click="addNewDispatch"
                    plain
                    block>新增配送</van-button>
      </div>
    </div>
    <div class="add"
         v-show="isAdd">
      <van-form @submit="onAddSubmit">
        <van-field v-model="form.customerAddress"
                   name="配送地址"
                   label="配送地址"
                   placeholder="配送地址"
                   :rules="[{ required: true, message: '请填写配送地址' }]" />

        <van-field v-model="form.customerName"
                   name="客户名称"
                   label="客户名称"
                   placeholder="客户名称"
                   :rules="[{ required: true, message: '请填写客户名称' }]" />

        <!-- <SelectMultiple /> -->
        <van-field readonly
                   clickable
                   name="picker"
                   :value="storeLabel"
                   label="配送商品"
                   placeholder="点击选择配送商品"
                   :rules="[{ required: true, message: '请选择配送商品' }]"
                   @click="showLabel" />

        <!-- 选择配送的商品 -->
        <van-popup v-model="showlabelPicker"
                   position="bottom">
          <!-- <van-picker show-toolbar
                      value-key="val"
                      :columns="goodsOption"
                      @confirm="onConfirmLable"
                      @cancel="showlabelPicker = false" /> -->
          <div class="flex-between color-6 t-14 padding-10">
            <span @click="onCancelCheck">取消</span>
            <span @click="onSubmitCheck">确定</span>
          </div>
          <div class="label-container">
            <van-checkbox-group v-model="form.goodsList">
              <van-cell-group>
                <van-cell v-for="(item, index) in goodsOption"
                          clickable
                          :key="item.index"
                          :title="`${item.goodsName}`"
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

        <van-field v-model="form.orderPrice"
                   type="number"
                   name="订单总价"
                   label="订单总价"
                   placeholder="订单总价"
                   :rules="[{ required: true, message: '请填写订单总价' }]" />

        <van-field v-model="form.phone"
                   name="联系方式"
                   label="联系方式"
                   placeholder="联系方式"
                   :rules="[{ required: true, message: '请填写联系方式' }]" />

        <!-- 选择配送状态 -->
        <van-field readonly
                   v-if="isEdit"
                   clickable
                   name="picker"
                   :value="orderLabel"
                   label="配送状态"
                   placeholder="点击选择配送状态"
                   :rules="[{ required: true, message: '请选择配送状态' }]"
                   @click="showTypePicker = true" />
        <van-popup v-model="showTypePicker"
                   position="bottom">
          <van-picker show-toolbar
                      value-key="val"
                      :columns="typeOptions"
                      @confirm="onConfirm"
                      @cancel="showTypePicker = false" />
        </van-popup>

        <div style="margin: 26px 16px;">
          <van-button block
                      type="info"
                      native-type="submit">提交</van-button>
        </div>

      </van-form>
    </div>
  </div>
</template>

<script>
import { getDispatchList, getShopGoodsList, addDispatch, deleteDispatch, updateDispatch } from '../../../services/services_shop'
import { mapState } from 'vuex'

const initForm = () => {
  return {
    customerAddress: '',
    customerName: '',
    goodsList: [],
    orderPrice: '',
    phone: ''
  }
}
export default {
  name: "dispatch",
  data () {
    return {
      current: 0,//页码
      size: 10,//条数
      finished: false,
      loading: false,
      list: [],
      isAdd: false,
      form: initForm(),
      showlabelPicker: false,
      storeLabel: '',
      goodsOption: [],
      orderStatus: 0, //配送状态 0 进行中  1已完成  2退货
      orderLabel: '配送中',
      isEdit: false, //是否为编辑状态
      showTypePicker: false,
      typeOptions: [
        { val: "配送中", id: 0 },
        { val: "配送完成", id: 1 },
        { val: "退货", id: 2 }
      ]
    }
  },
  computed: {
    ...mapState('app', ['shopId']),
    // 控制角标颜色
    statusStyle () {
      return (status) => {
        switch (status) {
          case 1:
            return 'primary'
          case 2:
            return 'danger'
          default:
            return ''
        }
      }
    }
  },
  methods: {
    onConfirm (data) {
      this.orderStatus = data.id
      this.orderLabel = data.val
      this.showTypePicker = false;
    },
    toggle (index) {
      this.$refs.checkboxes[index].toggle();
    },
    onLoad () {
      this.current += 1
      this.feachList()
    },
    onRefresh () {
      // 清空列表数据
      this.finished = false;
      this.current = 0;
      this.list = []
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
    async feachList () {
      try {
        this.loading = true;
        const res = await getDispatchList({ current: this.current, size: this.size })
        if (res.code != 0) {
          this.$toast(res.msg)
          // console.log(res.msg);
          this.loading = false;
        } else {
          this.list = this.list.concat(res.data.records)
          this.loading = false;
          if (res.data.records.length == 0) {
            this.finished = true
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    showLabel () {
      this.storeLabel = ''
      this.form.goodsList = []
      this.showlabelPicker = true
    },
    onSubmitCheck () {
      let storeLabel = ''
      const dataArr = [...this.form.goodsList]
      this.form.goodsList = dataArr.map(item => {
        storeLabel = storeLabel + item.goodsName + '/'
        return item.id
      })
      this.storeLabel = storeLabel

      // this.storeLabel = storeLabel
      this.showlabelPicker = false
    },
    onCancelCheck () {
      this.form.goodsList = []
      this.storeLabel = ''
      this.showlabelPicker = false
    },
    async getStoreLabel () {
      const res = await getShopGoodsList({
        current: 1,
        size: 999,
        shopId: this.shopId
      })
      if (res.code == 0) {
        this.goodsOption = res.data.records
      } else {
        this.$toast(res.msg)
      }
    },
    async onAddSubmit () {
      if (!this.isEdit) {
        // 新增地址提交
        if (this.form.orderPrice) {
          this.form.orderPrice = Number(this.form.orderPrice)
        }

        this.form.goodsList = JSON.stringify(this.form.goodsList)

        const res = await addDispatch(this.form)
        if (res.code == 0) {
          this.$toast('新增成功')
          this.form = initForm()
          this.storeLabel = ''
          this.addBack()
        } else {
          this.$toast(res.msg)
        }
      } else {
        if (this.form.orderPrice) {
          this.form.orderPrice = Number(this.form.orderPrice)
        }

        this.form.goodsList = JSON.stringify(this.form.goodsList)
        this.form.orderStatus = this.orderStatus
        const res = await updateDispatch(this.form)
        if (res.code == 0) {
          this.$toast('编辑成功')
          this.form = initForm()
          this.storeLabel = ''
          this.addBack()
        } else {
          this.$toast(res.msg)
        }
      }

    },
    // 新增配送
    addNewDispatch () {
      this.isAdd = true
    },
    addBack () {
      this.isAdd = false
      this.isEdit = false
      this.current = 0
      this.list = []
      this.feachList()
    },
    // 编辑
    edit (data) {
      const { id, customerAddress, customerName, goodsList, orderPrice, phone, orderStatus } = data
      if (orderStatus == 0) {
        this.orderLabel = '配送中'
      } else if (orderStatus == 1) {
        this.orderLabel = '配送完成'
      } else {
        this.orderLabel = '退货'
      }
      let goodsNames = ''
      this.goodsOption.forEach(item => {
        if (goodsList.indexOf(item.id) != -1) {
          goodsNames = goodsNames + item.goodsName + '/'
        }
      })
      this.storeLabel = goodsNames

      this.form = { id, customerAddress, customerName, goodsList: JSON.parse(goodsList), orderPrice, phone, orderStatus }

      this.isAdd = true
      this.isEdit = true
    },
    // 删除
    remove (data) {
      this.$dialog.confirm({
        title: '提示',
        message: '确认要删除该条派送信息么?',
      })
        .then(async () => {
          // on confirm
          const { id } = data
          const res = await deleteDispatch({ id })
          if (res.code == 0) {
            this.onRefresh()
            this.$toast('删除成功')
          } else {
            this.$toast(res.msg)
          }
        })
        .catch(() => {
          // on cancel
          this.$toast('已取消')
        });
    }
  },
  filters: {
    formatStatus (status) {
      switch (status) {
        case 0:
          return '配送中'
        case 1:
          return '配送完成'
        case 2:
          return '已退货'
        default:
          return
      }
    }
  },
  created () {
    this.getStoreLabel()
  }
}
</script>

<style lang="scss" scoped>
.dispatch {
  background-color: #f0f0f0;

  .scroll {
    height: calc(100vh - 0.82rem);
    overflow: auto;
  }

  .pai-song {
    position: relative;
    margin: 10px auto;
    width: 90%;
    padding: 10px;
    box-sizing: border-box;
    background-color: #fff;
    overflow: hidden;
    border-radius: 8px;

    & > .status {
      position: absolute;
      right: -32px;
      top: -9px;
      background-color: #c79d68;
      color: #fff;
      padding: 0.16rem 0.24rem;
      transform: rotate(45deg);

      & > span {
        position: relative;
        top: 10px;
      }
    }
    & > .primary.status {
      background-color: #1989fa;
    }

    & > .danger.status {
      background-color: red;
    }
    /*; */
    .chanpin {
      display: inline-block;
      margin-right: 10px;
    }
  }
  .label-container {
    max-height: 4rem;
    overflow: auto;
  }

  .operation {
    margin-top: 4px;
    text-align: right;
  }
}
</style>