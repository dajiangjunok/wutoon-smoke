<template>
  <div class="no-discount">
    <i class="iconfont icon-zanwushuju t-24 margin-right-10"></i>
    <span class="t-14">暂无优惠券</span>
  </div>
</template>

<script>
export default {
  name: 'NoDiscount'
}
</script>

<style lang="scss" scoped>
.no-discount {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>