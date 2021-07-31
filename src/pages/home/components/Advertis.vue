<template>
  <div class="advertise">
    <img class="a-img"
         :src="data.imageUrl" />
    <div class="a-info">
      <div class="flex-between">
        <div style="width:1.2rem"
             class="t-18 text-ellipsis">{{data.title}}</div>
        <span>{{data.content}}</span>
      </div>
      <span class="t-14 time">{{data.updateTime}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Advertise",
  props: {
    data: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
.advertise {
  display: flex;
  flex-direction: column;
  margin: 0.1rem 0;
  /* background-color: pink; */
  height: 2rem;
  border-radius: 0.1rem;
  box-sizing: border-box;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  .a-img {
    flex: 2;
    width: 100%;
    height: 1.33rem;
    /* height: 1.33rem; */
  }

  .a-info {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    padding: 0.1rem;
    padding-left: 0.4rem;
    flex: 1;
    color: #363636;
    /* background-color: orange; */

    .time {
      color: #989898;
    }
  }
}
</style>