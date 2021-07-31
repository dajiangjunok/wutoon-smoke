<template>
  <div class="flavordetail">
    <NavBar :isBack="true"
            title="雾化弹百科" />
    <div class="flavor-swiper">
      <van-swipe class="my-swipe"
                 :autoplay="3000"
                 indicator-color="white">
        <van-swipe-item v-for="(item,index) in detail.listImgUrlList"
                        :Key="index">
          <img :src="item"
               style="height:100%"
               alt="轮播图">
        </van-swipe-item>
      </van-swipe>
      <div class="flavordetail-container">
        <div class="flavor-title">
          <h3>产品系列：{{detail.seriesName}}</h3>
          <!-- <span>
            <i class="iconfont icon-xihuan t-18"
               style="color:#D81E06;margin-right:4px"></i>
            <span>1254人喜欢</span>
          </span> -->
        </div>
        <!-- <ChanPinCard :info='chanPinInfo' /> -->
        <ChanPinCard :info='goodsSpecInfo' />
        <ChanPinCard :info='chanPinPrice' />
        <ChanPinCard :info='supportTaste' />

        <div class="chanpin-info">
          <div class="sub-title">
            <span>商品详情</span>
          </div>
          <!-- 视频 -->
          <video width="100%"
                 height="240"
                 controls>
            <source :src="detail.videoUrl"
                    type="video/mp4">
            <source :src="detail.videoUrl"
                    type="video/ogg">
            您的浏览器不支持 video 标签。
          </video>
          <!-- 参数图 -->
          <img :src="item"
               alt="参数"
               v-for="(item,index) in detail.paramImgUrlList"
               :key="index">
          <!-- 详情图 -->
          <img :src="item"
               alt="详情"
               v-for="(item,index) in detail.listImgUrlList"
               :key="index">
          <!-- 口感图 -->
          <img :src="item"
               alt="口感"
               v-for="(item,index) in detail.tasteImgUrlList"
               :key="index">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/base/NavBar.vue'
import ChanPinCard from '@/components/common/ChanPinCard.vue'

import { getGoodsById } from '../../services/services_shop'

export default {
  name: "FlavorDetail",
  data () {
    return {
      detail: {}, //商品详情
    }
  },
  components: {
    NavBar,
    ChanPinCard
  },
  mixins: [],
  props: {

  },
  created: function () {
    this.getYanDanDetail(this.$route.query.id)
  },
  mounted: function () {

  },
  computed: {
    // chanPinInfo () {
    //   return {
    //     title: '产品信息',
    //     type: 'label',
    //     list: [`尼古丁含量：${this.detail.nicotine}%`, `口味类型：${this.detail.tasteNameValue}`]
    //   }
    // },
    goodsSpecInfo () {
      return {
        title: '产品特点',
        type: 'label',
        list: this.detail.goodsSpecInfoNameList
      }
    },
    chanPinPrice () {
      return {
        title: '产品价格',
        type: 'label',
        list: [`${this.detail.salePrice / 100}元 / 支`]
      }
    },
    supportTaste () {
      return {
        title: '支持口味',
        type: 'label',
        list: this.detail.supportTasteNameList
      }
    }
  },
  methods: {
    // 获取烟弹详情
    async getYanDanDetail (id) {
      const res = await getGoodsById(id)
      if (res.code == 0) {
        this.detail = res.data
      } else {
        this.$toast(res.msg)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.flavordetail {
  font-size: 0.12rem;
  background-color: #ededed;

  .flavor-swiper {
    height: calc(100vh - 40px);
    overflow: auto;
  }

  .flavordetail-container {
    background-color: #ededed;
  }

  .flavor-title {
    display: flex;
    justify-content: space-between;
    padding: 0 0.1rem;
    align-items: center;
    border-top: 1px solid #e5e5e5;
    background-color: #fff;
  }

  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    height: 150px;
    text-align: center;
    background-color: #fff;
  }

  .chanpin-info {
    padding: 0.1rem 0.1rem;
    margin-bottom: 0.1rem;
    background-color: #fff;

    .sub-title {
      padding-bottom: 0.1rem;
      color: #333333;
      font-size: 0.14rem;
      border-bottom: 1px solid #e5e5e5;
    }

    .sub-title > span {
      padding-left: 0.1rem;
      border-left: 2px solid #00aaf0;
    }

    & img {
      width: 100%;
    }
  }
}
</style>
