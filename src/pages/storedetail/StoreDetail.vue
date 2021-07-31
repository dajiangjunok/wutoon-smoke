<template>
  <div class="storedetail">
    <NavBar :isBack='true'
            title="门店详情" />
    <!-- 1.店铺详情卡片 -->
    <DetailCard :detail="detail" />
    <!-- 2.产品卡片 -->
    <div class="chanpin-card-container">
      <div class="chanpin-card">
        <h3>门店有售</h3>
        <span class="color-9 margin-bottom-10 display-inline-block">畅销口味建议您提前和门店联系，避免到店扑空</span>
        <div class="flex chanpin-swiper">
          <div @click="onLinkToChanPin(item)"
               class="flex flex-column t-center margin-right-10"
               v-for="(item,index) in detail.goodsList "
               :key="index">
            <div class="chanpin-item margin-bottom-5">
              <img :src="item.shopGoodsDetailInfo.listImgUrlList[0]"
                   style="width:100%;height:100%"
                   alt="">
            </div>
            <span>{{item.goodsName}}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 门店服务 -->
    <!-- <div class="mendian-card-container">
      <div class="mendian-card">
        <h3>门店服务</h3>
        <div class="mendian-content">
          <div>
            <i class="iconfont icon-iconfontquestion"></i>
            <span>免费试吸</span>
          </div>
          <div> <i class="iconfont icon-iconfontquestion"></i>
            <span>周边有售</span>
          </div>
        </div>
        <div class="mendian-content">
          <div> <i class="iconfont icon-iconfontquestion"></i>
            <span>满198元包邮</span>
          </div>
          <div> <i class="iconfont icon-iconfontquestion"></i>
            <span>满396元包闪送</span>
          </div>
        </div>

      </div>
    </div> -->
    <!-- 门店指引 -->
    <div class="zhiyin-card-container">
      <div class="zhiyin-card">
        <h3>店面详情</h3>
        <div>
          <img class="store-img"
               v-for="(item,index) in detail.detailPictureUrlList"
               :key="index"
               :src="item"
               alt="店铺详情">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/base/NavBar.vue'
import DetailCard from './components/DetailCard.vue'

import { getShopInfo } from '../../services/services_shop'
export default {
  name: "StoreDetail",
  components: {
    NavBar,
    DetailCard
  },
  mixins: [],
  props: {

  },
  data: function () {
    return {
      detail: {}
    }
  },
  created: function () {
    this.getStoreInfo()
  },
  mounted: function () {

  },
  computed: {
    goods () {
      let goods = []
      this.detail.goodsIdsList.forEach((item, index) => {
        goods[index] = { id: item, name: this.detail.goodsNamesList[index] }
      })
      return goods
    }
  },
  methods: {
    // 跳转到产品
    onLinkToChanPin (data) {
      const { type, goodsId } = data
      if (type == 1) {
        this.$router.push({
          path: '/devicedetail',
          query: {
            id: goodsId
          }
        })
      } else {
        this.$router.push({
          path: '/flavordetail',
          query: {
            id: goodsId
          }
        })
      }
    },
    // 获取店铺详情
    async getStoreInfo () {
      const res = await getShopInfo(this.$route.query.id)
      if (res.code == 0) {
        this.detail = res.data
        console.log(res.data);
      } else {
        this.$toast(res.msg)
      }
    },
  }
}
</script>

<style scoped lang="scss">
.storedetail {
  font-size: 0.12rem;
  background: #ededed;
  height: calc(100vh);

  .chanpin-card-container,
  .mendian-card-container,
  .zhiyin-card-container {
    padding: 0 0.1rem 0.1rem;
  }
  .chanpin-card,
  .mendian-card,
  .zhiyin-card {
    padding: 0.1rem;
    background-color: #fff;
    min-height: 0.6rem;
    border-radius: 8px;
  }

  .chanpin-item {
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 5px;
    background-color: #d9d9d9;
  }

  .chanpin-swiper {
    width: 3.3rem;
    overflow: auto;
  }

  .mendian-card .mendian-content {
    display: flex;

    & > div {
      display: flex;
      align-items: center;
      flex: 1;
      margin-bottom: 0.1rem;
      & > span {
        display: inline-block;
        margin-left: 0.12rem;
        color: #000;
        font-size: 0.16rem;
      }
      & > i {
        font-size: 0.2rem;
        color: #3ac5fd;
      }
    }
  }

  .zhiyin-card .store-img {
    width: 89vw;
  }

  h3 {
    margin-block-start: 0;
  }
}
</style>
