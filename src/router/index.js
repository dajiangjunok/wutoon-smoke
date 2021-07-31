import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

// 1.安装VueRouter
Vue.use(VueRouter)

// 2.获取路由信息
// 动态加载pages中所有的路由文件
const files = require.context('@/pages', true, /router\.js$/);
const routes = files.keys().map(key => {
  const page = require('@/pages' + key.replace('.', ''));
  return page.default;
})

// 3.创建路由对象
const router = new VueRouter({
  mode: 'hash',
  routes
})

router.beforeEach((to, from, next) => {
  store.commit('app/changeRoute', to.path)
  next()
})

// 4.导出
export default router
