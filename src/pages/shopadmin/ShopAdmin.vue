<template>
  <div class="shopadmin">
    <NavBar :isBack="true"
            v-if="pageStatus==-1"
            title="我的店铺" />
    <van-nav-bar :title="statusText"
                 v-else
                 :left-arrow="true"
                 @click-left="onClickLeft" />

    <div class="content-list"
         v-if="pageStatus==-1">
      <div @click="onGoods">
        <div class="list-item">
          <i class="iconfont icon-shangpin margin-right-10 color-primary  t-18"></i>
          <span>店铺商品</span>
        </div>
        <van-icon name="arrow"
                  class="padding-right-10"
                  color="#c79d68" />
      </div>

      <div @click="onAddGoods">
        <div class="list-item">
          <i class="iconfont icon-shangpin margin-right-10 color-primary  t-18"></i>
          <span>新增店铺商品</span>
        </div>
        <van-icon name="arrow"
                  class="padding-right-10"
                  color="#c79d68" />
      </div>

      <div @click="onDispatch">
        <div class="list-item">
          <i class="iconfont icon-kuaidi margin-right-10 color-primary  t-20"></i>
          <span>商家配送</span>
        </div>
        <van-icon name="arrow"
                  class="padding-right-10"
                  color="#c79d68" />
      </div>
      <!-- <div @click="onProduct">
        <div class="list-item">
          <i class="iconfont icon-chanpin margin-right-10 color-primary  t-18"></i>
          <span>产品系列</span>
        </div>
        <van-icon name="arrow"
                  class="padding-right-10"
                  color="#c79d68" />
      </div> -->
    </div>
    <div v-if="pageStatus == 1">
      <Goods />
    </div>
    <div v-if="pageStatus == 2">
      <AddGoods @close="onClickLeft" />
    </div>
    <div v-if="pageStatus == 3">
      <Dispatch />
    </div>
    <div v-if="pageStatus == 4">
      <Products />
    </div>

  </div>
</template>

<script>
import NavBar from '@/components/base/NavBar.vue'
import Goods from './components/Goods.vue'
import AddGoods from './components/AddGoods.vue'
import Products from './components/Products.vue'
import Dispatch from './components/Dispatch.vue'

export default {
  name: "ShopAdmin",
  components: {
    NavBar,
    Goods,
    AddGoods,
    Products,
    Dispatch
  },
  mixins: [],
  props: {

  },
  data: function () {
    return {
      pageStatus: -1,//-1是显示选项列表
    }
  },
  created: function () {

  },
  mounted: function () {

  },
  computed: {
    statusText () {
      switch (this.pageStatus) {
        case 1:
          return '商铺商品'
        case 2:
          return '新增店铺商品'
        case 3:
          return '派送列表';
        case 4:
          return '产品系列'
        default:
          break;
      }
    }
  },
  methods: {
    onGoods () {
      this.pageStatus = 1
    },
    onAddGoods () {
      this.pageStatus = 2
    },
    onDispatch () {
      this.pageStatus = 3
    },
    onProduct () {
      this.pageStatus = 4
    },
    onClickLeft () {
      this.pageStatus = -1
    }
  }
}
</script>

<style scoped lang="scss">
.shopadmin {
  .content-list > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 0.6rem;
    line-height: 0.6rem;
    font-size: 0.16rem;
    border-bottom: 1px solid #eee;
  }

  .list-item {
    padding: 0.2rem 0.4rem;
  }

  .nav {
    display: flex;
    justify-content: space-between;
  }
}
</style>
