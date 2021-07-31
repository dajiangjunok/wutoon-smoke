<template>
  <div class="nav-bar">
    <van-nav-bar :title="title"
                 :left-text="rText"
                 :right-text="lText"
                 :left-arrow="isBack"
                 @click-left="onClickLeft"
                 @click-right="onClickRight" />
  </div>
</template>

<script>
export default {
  name: "NavBar",
  props: {
    title: {
      type: String,
      required: true
    },
    rText: {
      type: String,
      default: null
    },
    lText: {
      type: String,
      default: null
    },
    isBack: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onClickLeft () {
      this.$router.back(-1)
    },
    onClickRight () {
      Toast('按钮');
    },
  },
}
</script>

<style>
</style>