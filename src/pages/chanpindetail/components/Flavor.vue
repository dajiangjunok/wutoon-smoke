<template>
  <div class="flavor">
    <!-- <van-dropdown-menu>
      <van-dropdown-item v-model="niGuDing"
                         :options="niGuDingOption" />
      <van-dropdown-item v-model="kouWeiLX"
                         :options="kouWeiLXOption" />
    </van-dropdown-menu> -->
    <div class="flavor-container">
      <van-list v-model="loading"
                class="scroll"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad">
        <div v-if="list.length!=0">
          <Card :isDevice="false"
                v-for="(item,index) in list"
                :detail="item"
                :key="index" />
        </div>

      </van-list>
    </div>
  </div>
</template>

<script>
import Card from './Card.vue'

import { getGoodsList } from '../../../services/services_shop'
export default {
  name: 'Flavor',
  data () {
    return {
      // niGuDing: 0,
      // kouWeiLX: 'a',
      // niGuDingOption: [
      //   { text: '尼古丁含量', value: 0 },
      //   { text: '销售价格', value: 1 },
      //   { text: '活动商品', value: 2 },
      // ],
      // kouWeiLXOption: [
      //   { text: '口味类型', value: 'a' },
      //   { text: '好评排序', value: 'b' },
      //   { text: '销量排序', value: 'c' },
      // ],
      loading: false,
      finished: false,
      refreshing: false,
      current: 0,//页码
      size: 10,//条数
      list: [],
    }
  },
  methods: {
    onLoad () {
      this.current += 1
      this.feachNewsList()
    },
    onRefresh () {
      // 清空列表数据
      this.finished = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
    async feachNewsList () {
      try {
        this.loading = true;
        const res = await getGoodsList({ current: this.current, size: this.size, type: 2 })
        if (res.code != 0) {
          this.$toast(res.msg)
          // console.log(res.msg);
          this.loading = false;
        } else {
          this.list = this.list.concat(res.data.records)
          this.loading = false;
          if (res.data.records.length == 0) {
            this.finished = true
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  },
  components: {
    Card
  }
}
</script>

<style scoped lang="scss">
.flavor {
  ::v-deep .van-dropdown-menu__bar {
    height: 32px !important;
  }

  .flavor-container {
    height: calc(100vh - 1.5rem);
    overflow: auto;
  }
}
</style>