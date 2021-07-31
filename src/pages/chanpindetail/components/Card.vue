<template>
  <div class="card"
       @click="onCardClick">
    <img :src="detail.securityCodeImgUrl"
         alt="口味">
    <div class="flex flex-column">
      <h3>口味名称：{{detail.goodsName}}</h3>
      <span class="margin-bottom-10 color-9">产品系列：{{detail.seriesName}}</span>
      <div v-if="!isDevice">
        <div class="label">
          <span>尼古丁含量{{detail.nicotine}}%</span>
        </div>
        <div class="label">
          <span>口味系列：{{detail.tasteNameValue}}</span>
        </div>
      </div>
      <div v-else>
        <div>
          <span class="color-9">支持口味</span>
          <div class="flex support">
            <div class="label"
                 style="margin-right:2px"
                 v-for="(item,index ) in detail.supportTasteNameList"
                 :key="index">
              <span>{{item}}</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    isDevice: {
      type: Boolean,
      required: true
    },
    detail: {
      type: Object,
      required: true
    }
  },
  methods: {
    onCardClick () {
      if (this.isDevice) {
        this.$router.push({
          path: '/devicedetail',
          query: {
            id: this.detail.id
          }
        })
      } else {
        this.$router.push({
          path: '/flavordetail',
          query: {
            id: this.detail.id
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  padding: 0.1rem;
  background-color: #fff;
  font-size: 12px;
  & > img {
    margin-right: 0.1rem;
    height: 1rem;
    width: 1rem;
  }
  .label {
    margin-top: 0.1rem;
    & > span {
      padding: 2px 8px;
      background-color: #00aaf0;
      color: #fff;
      border-radius: 10px;
    }
  }

  h3 {
    margin-block-start: 0;
    margin-block-end: 0.5em;
  }

  .support {
    flex-wrap: wrap;
  }
}
</style>