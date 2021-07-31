<template>
  <div class="product">
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
      <van-card v-for="(item,index) in productList"
                :desc="item.type==1?'烟杆':'烟弹'"
                :key="index"
                :title="item.name">

        <div slot="thumb">
          <img src="~@/assets/img/product.jpg"
               style="width:0.8rem"
               alt="雾桐">
        </div>

        <div slot="num">
          <van-button block
                      size="small"
                      type="info"
                      v-show="isEnable==0"
                      @click="upProduct(item.id)">上架</van-button>
          <van-button block
                      size="small"
                      v-show="isEnable==1"
                      type="danger"
                      @click="downProduct(item.id)">下架</van-button>
        </div>
      </van-card>
    </van-list>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getShopProductList, upOrDownProduct } from '@/services/services_shop'

export default {
  name: "product",
  data () {
    return {
      loading: false,
      current: 1,
      size: 10,
      isEnable: 1, //是否上架 1上架，0是下架
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
      productList: [],//产品的系列
    }
  },
  methods: {
    searchChange () {
      //清空列表，清空分页，重新请求
      this.productList = []
      this.current = 1
      this.FeatchShopProductList()
    },
    // 获取产品列表
    async FeatchShopProductList () {
      const patams = {
        current: this.current,
        size: this.size,
        isEnable: this.isEnable,
        type: this.type,
        shopId: this.shopId
      }
      this.loading = true;
      const res = await getShopProductList(patams)
      if (res.code == 0) {
        console.log(res.data.records);
        this.productList = this.productList.concat(res.data.records)
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
      this.FeatchShopProductList()
    },
    // 上下架商品
    async upProduct (id) {
      const res = await upOrDownProduct(id, 1)
      if (res.code == 0) {
        this.$toast('上架成功')
        this.searchChange()
      } else {
        this.$toast(res.msg)
      }
    },
    async downProduct (id) {
      const res = await upOrDownProduct(id, 0)
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
    this.FeatchShopProductList()
  }
}
</script>

<style lang="scss" scoped>
.product {
}
</style>