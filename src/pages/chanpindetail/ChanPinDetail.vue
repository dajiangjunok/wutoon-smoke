<template>
  <div class="ency">
    <NavBar title="产品详情" />
    <van-tabs v-model="active">
      <van-tab title="口味百科">
        <!-- 口味百科 -->
        <Flavor />
      </van-tab>
      <van-tab title="设备款式">
        <!-- 设备百科 -->
        <Device />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import NavBar from '@/components/base/NavBar.vue'
import Flavor from './components/Flavor.vue'
import Device from './components/Device.vue'

export default {
  name: "ChanPinDetail",
  mixins: [],
  props: {

  },
  data: function () {
    return {
      active: ''
    }
  },
  created: function () {

  },
  mounted: function () {

  },
  computed: {

  },
  methods: {

  },
  components: {
    NavBar,
    Flavor,
    Device
  }
}
</script>

<style scoped lang="scss">
.ency {
  background: #ededed;
  /* min-height: 200px; */
  ::v-deep .van-tabs__line {
    width: 1.5rem !important;
    background-color: #00aaf0;
  }

  ::v-deep .van-tab--active > span {
    color: #00aaf0;
  }
}
</style>

