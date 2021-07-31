<template>
  <div class="goods">
    <van-dropdown-menu>
      <van-dropdown-item v-model="isEnable"
                         @change="searchChange"
                         :options="enableOptions" />
      <van-dropdown-item v-model="type"
                         @change="searchChange"
                         :options="typeOptions" />
    </van-dropdown-menu>
    <van-list v-model="loading"
              class="scroll"
              :finished="finished"
              finished-text="暂无数据"
              @load="onLoad">
      <van-card v-for="(item,index) in goodsList"
                :desc="item.goodsText"
                :key="index"
                :price="item.shopSalePrice/100"
                :title="item.goodsName">

        <div slot="thumb">
          <img :src="item.shopGoodsDetailInfo.listImgUrlList[0]"
               style="width:0.8rem"
               alt="雾桐">
        </div>

        <div slot="num">
          <van-checkbox v-model="item.checked"></van-checkbox>
        </div>
      </van-card>
    </van-list>
    <div style="margin: 26px 16px;">
      <van-button block
                  type="info"
                  v-show="isEnable==0"
                  @click="upGoods">上架</van-button>
      <van-button block
                  v-show="isEnable==1"
                  type="danger"
                  @click="downGoods()">下架</van-button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getShopGoodsList, upOrDownGoods } from '@/services/services_shop'

export default {
  name: "product",
  data () {
    return {
      loading: false,
      current: 1,
      size: 10,
      isEnable: 0, //是否上架 1上架，0是下架
      type: 1,//烟杆还是烟头,1是烟杆，2是烟头
      enableOptions: [
        { text: '上架系列', value: 1 },
        { text: '下架系列', value: 0 },
      ],
      typeOptions: [
        { text: '烟杆', value: 1 },
        { text: '烟弹', value: 2 },
      ],
      finished: false,
      goodsList: [],//产品的系列
    }
  },
  methods: {
    searchChange () {
      //清空列表，清空分页，重新请求
      this.goodsList = []
      this.current = 1
      this.fearchList()
    },
    // 获取产品列表
    async fearchList () {
      const params = {
        current: this.current,
        size: this.size,
        isEnable: this.isEnable,
        type: this.type,
        shopId: this.shopId
      }
      this.loading = true;
      const res = await getShopGoodsList(params)
      if (res.code == 0) {
        console.log(res.data.records);
        this.goodsList = this.goodsList.concat(res.data.records)
        this.loading = false;
        if (res.data.records.length == 0) {
          this.finished = true
        }
      } else {
        this.$toast(res.msg)
        this.loading = false;
      }
    },
    onLoad () {
      this.current += 1
      this.fearchList()
    },
    // 上下架商品
    async upGoods () {
      const idList = this.goodsList.map(item => {
        if (item.checked) {
          return item.id
        }
      })
      const res = await upOrDownGoods(idList, 1)
      if (res.code == 0) {
        this.$toast('上架成功')
        this.searchChange()
      } else {
        this.$toast(res.msg)
      }
    },
    async downGoods () {
      const idList = this.goodsList.map(item => {
        if (item.checked) {
          return item.id
        }
      })
      const res = await upOrDownGoods(idList, 0)
      if (res.code == 0) {
        this.$toast('下架成功')
        this.searchChange()
      } else {
        this.$toast(res.msg)
      }
    }
  },
  computed: {
    ...mapState('app', ['shopId'])
  },
  created () {
    this.fearchList()
    // console.log(this.$productId);
  }
}
</script>

<style lang="scss" scoped>
.goods {
}
</style>