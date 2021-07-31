<template>
  <van-swipe class="my-swipe"
             :autoplay="3000"
             indicator-color="white"
             height="103">
    <van-swipe-item>
      <img class="img"
           src="~@/assets/img/swiper.png"
           alt="轮播">
    </van-swipe-item>
    <van-swipe-item style="backgroundColor:pink;">

    </van-swipe-item>
  </van-swipe>
</template>

<script>
export default {
  name: 'Swiper'
}
</script>

<style scoped lang="scss">
.my-swipe {
  .img {
    width: 100%;
  }
}
</style>