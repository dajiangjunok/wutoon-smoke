<template>
  <div class="my-menu">
    <div class="flex-between flex-center"
         style="width:100vw">
      <div class="ju-li-pai-xu"
           style="padding-left:0.5rem">
        <van-dropdown-menu active-color="#c79d68"
                           :overlay="false">
          <van-dropdown-item :value="shopSortTypeEnum"
                             @change="sortChange"
                             :options="juLiOptions" />
        </van-dropdown-menu>
      </div>
      <div class="lie-biao"
           style="padding-right:0.5rem"
           @click="onToggleList">
        <span class="list"
              @click="isShowMap=!isShowMap">{{isShowMap?'列表':'地图'}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Swiper',
  props: {
    shopSortTypeEnum: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      isShowMap: false,
      juLiOptions: [
        { text: '智能排序', value: '1' },
        { text: '距离排序', value: '2' },
      ],

    };
  },
  methods: {
    // 切换地图或列表
    onToggleList () {
      this.$emit('toggleList', this.isShowMap)
    },
    sortChange (val) {
      this.$emit("sortChange", val)
    }
  },
}
</script>

<style scoped lang="scss">
.my-menu {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-size: 0.14rem;
  color: #323233;

  ::v-deep .van-dropdown-menu__bar {
    background-color: #f6f6f6;
    box-shadow: 0 0 0 rgb(255, 255, 255);
    font-size: 0.14rem;
  }

  ::v-deep .van-ellipsis {
    font-size: 0.14rem !important;
  }

  .lie-biao {
    position: relative;

    .list::after {
      position: absolute;
      top: 50%;
      right: 0.35rem;
      margin-top: -5px;
      border: 3px solid;
      border-color: transparent transparent #dcdee0 #dcdee0;
      -webkit-transform: rotate(-45deg);
      transform: rotate(-45deg);
      opacity: 0.8;
      content: "";
    }
  }
}
</style>