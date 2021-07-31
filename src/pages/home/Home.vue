<template>
  <div class="home">
    <NavBar title="首页" />
    <div class="content">
      <van-list v-model="loading"
                class="scroll"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad">
        <div class="c-header">
          <HeaderCard />
          <NavLink />
        </div>
        <div class="c-bottom">
          <Advertis v-for="(item,index) in list"
                    :key="index"
                    :data="item" />
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/base/NavBar.vue'
import HeaderCard from './components/HeaderCard.vue'
import NavLink from './components/NavLink.vue'
import Advertis from './components/Advertis.vue'

import { getNewsList } from '@/services/services_news'

export default {
  name: "Home",
  mixins: [],
  props: {

  },
  data: function () {
    return {
      current: 1,//页码
      size: 10,//条数
      list: [],
      // listRoot: [],
      loading: false,
      finished: false,
      refreshing: false,
    }
  },
  async created () {
    await this.updateUser(this.$store.state.app.userId)
    await this.feachNewsList()
    if (!this.$store.state.app.verified) {
      return this.$router.replace({ path: "/idcard" })
    }
  },
  mounted: function () {

  },
  computed: {

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
    async updateUser (userId) {
      this.$store.dispatch('app/getUserInfo', userId)
      this.$store.dispatch('app/getCountByUserId', userId)
    },
    async feachNewsList () {
      try {
        this.loading = true;
        const res = await getNewsList({ current: this.current, size: this.size })
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
    NavBar,
    HeaderCard,
    NavLink,
    Advertis
  }
}
</script>

<style scoped lang="scss">
.home {
  box-sizing: border-box;
  font-size: 0.12rem;
  overflow: hidden;
  /* background-color: pink; */

  .content {
    .c-header {
      padding: 0.1rem;
      background-color: #f6f6f6;
    }
    .c-bottom {
      padding: 0 0.1rem;
    }
    .scroll {
      height: calc(100vh - 0.9rem);
      overflow: auto;
    }
  }
}
</style>
