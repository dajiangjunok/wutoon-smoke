<template>
  <div class="product">
    <van-tabs v-model="type"
              @change="searchChange">
      <van-tab title="烟杆"
               :name="1"></van-tab>
      <van-tab title="烟弹"
               :name="2"></van-tab>
    </van-tabs>
    <van-list v-model="loading"
              class="scroll"
              :finished="finished"
              finished-text="暂无数据"
              @load="onLoad">
      <van-card v-for="(item,index) in list"
                :desc="item.goodsText"
                :key="index"
                :price="item.salePrice/100"
                :title="item.goodsName">

        <div slot="thumb">
          <img :src="item.listImgUrlList[0]"
               style="width:0.8rem"
               alt="雾桐">
        </div>

        <div slot="num">
          <div slot="num">
            <van-checkbox v-model="item.checked"></van-checkbox>
          </div>
        </div>
      </van-card>
    </van-list>
    <div style="margin: 26px 16px;">
      <van-button block
                  @click="add"
                  type="info">新增</van-button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getGoodsList, addShopGoods } from '@/services/services_shop'

export default {
  name: "product",
  data () {
    return {
      loading: false,
      current: 1,
      size: 10,
      // isEnable: 1, //是否上架 1上架，0是下架
      type: 1,//烟杆还是烟头,1是烟杆，2是烟头
      // enableOptions: [
      //   { text: '上架系列', value: 1 },
      //   { text: '下架系列', value: 0 },
      // ],
      typeOptions: [
        { text: '烟杆', value: 1 },
        { text: '烟弹', value: 2 },
      ],
      finished: false,
      list: [],//产品的系列
    }
  },
  methods: {
    searchChange () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 500
      });
      //清空列表，清空分页，重新请求
      this.list = []
      this.current = 1
      this.featchList()
    },
    // 获取产品列表
    async featchList () {
      const patams = {
        current: this.current,
        size: this.size,
        // isEnable: this.isEnable,
        type: this.type,
        // shopId: this.shopId
        isEnable: 0, //查询已上架商品
        productId: this.type == 2 ? this.$productIdD : this.$productIdG
      }
      this.loading = true;
      const res = await getGoodsList(patams)
      if (res.code == 0) {
        console.log(res.data.records);
        this.list = this.list.concat(res.data.records)
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
      this.featchList()
    },
    async add () {
      let ids = []
      this.list.forEach(item => {
        if (item.checked) {
          ids.push(item.id)
        }
      })

      const params = {
        goodsIdList: ids,
        productId: this.$productIdD
      }

      const res = await addShopGoods(params)
      if (res.code == 0) {
        this.$toast('新增成功')
        this.$emit('close')
      } else {
        this.$toast(res.msg)
      }
    }
    // // 上下架商品
    // async upProduct (id) {
    //   const res = await upOrDownProduct(id, 1)
    //   if (res.code == 0) {
    //     this.$toast('上架成功')
    //     this.searchChange()
    //   } else {
    //     this.$toast(res.msg)
    //   }
    // },
    // async downProduct (id) {
    //   const res = await upOrDownProduct(id, 0)
    //   if (res.code == 0) {
    //     this.$toast('下架成功')
    //     this.searchChange()
    //   } else {
    //     this.$toast(res.msg)
    //   }
    // }
  },
  computed: {
    ...mapState('app', ['shopId'])
  },
  created () {
    this.featchList()
  }
}
</script>

<style lang="scss" scoped>
.product {
}
</style>