<template>
  <div class="chanpindetail">
    <NavBar title="产品百科" />
    <div class="chanpindetail-swiper">
      <div class="chanpindetail-img-container">
        <img class="chanpindetail-img"
             style="width:100%"
             src="~@/assets/img/chanpin.jpg"
             alt="产品">
      </div>
      <div class="tab">
        <div @click="active=0"
             :class="active==0?'active':''">
          <span>各系列产品</span>
        </div>
        <div @click="active=1"
             :class="active==1?'active':''">
          <span>产品周边配件</span>
        </div>
      </div>
      <div class="chanpindetail-content">
        <!-- 产品 -->
        <div v-show="active==0">
          <EncyContent v-for="(item, index) in 8"
                       :key="index" />
        </div>
        <!-- 配件 -->
        <div class="content-peijian"
             v-show="active==1">
          配件
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/base/NavBar.vue'
import EncyContent from './components/EncyContent.vue'

export default {
  name: "ChanPinDetail",
  components: {
    NavBar,
    EncyContent
  },
  mixins: [],
  props: {

  },
  data: function () {
    return {
      active: 0
    }
  },
  created: function () {

  },
  mounted: function () {

  },
  computed: {

  },
  methods: {

  }
}
</script>

<style scoped lang="scss">
.chanpindetail {
  font-size: 0.12rem;
  background: #f8f8f8;

  .chanpindetail-swiper {
    height: calc(100vh - 90px);
    overflow: auto;
  }

  .chanpindetail-img-container {
    padding: 0.1rem;
    border-bottom: 4px solid #ededed;
  }
  .chanpindetail-img {
    width: 100%;
    border-radius: 6px;
  }

  .tab {
    display: flex;
    & > div {
      height: 0.4rem;
      line-height: 0.2rem;
      padding: 0.1rem;
      box-sizing: border-box;

      & > span {
        padding-bottom: 4px;
        color: #000;
        box-sizing: border-box;
      }
    }
    & > div.active > span {
      border-bottom: 2px solid #3ac5fd;
    }
  }

  .chanpindetail-content {
    padding: 0 0.1rem;
  }
}
</style>
