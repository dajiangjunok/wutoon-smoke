<template>
  <div class="content-ency"
       @click="onCardHandle">
    <div class="title">
      <span>悦刻幻影</span>
    </div>
    <div class="info">
      <img class="info-img"
           src="~@/assets/img/kouwei.jpg"
           alt="图">
      <div class="label">
        <div class="line">
          <span>产品特点</span>
          <span>实时掌握</span>
        </div>
        <div class="line">
          <span>口味数量</span>
          <span>16</span>
        </div>
        <div class="line">
          <span>产品价格</span>
          <span>268元~278元一杆</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EncyContent",
  data () {
    return {

    }
  },
  methods: {
    onCardHandle () {
      this.$router.push('/chanpindetail')
    }
  }
}
</script>

<style lang="scss" scoped>
.content-ency {
  background-color: #fff;
  border-radius: 4px;
  margin-bottom: 0.1rem;
  padding: 0 0.1rem 0.1rem;

  & > .title {
    margin-bottom: 0.1rem;
    padding-top: 0.1rem;
    padding-bottom: 0.1rem;
    border-bottom: 1px solid #e5e5e5;
    font-size: 0.14rem;
  }

  & > .info {
    display: flex;
    align-items: center;
    height: 100%;

    .label {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      height: 90px;
    }
  }

  & .info-img {
    margin-right: 0.1rem;
    width: 90px;
  }
  .label {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }
  .line {
    /* margin-top: 0.14rem; */
    & > span:nth-child(1) {
      padding-right: 0.1rem;
      font-weight: bold;
    }
    & > span:nth-child(2) {
      background-color: #00aaf0;
      color: #fff;
      padding: 4px 8px;
      border-radius: 2px;
    }
  }
}
</style>