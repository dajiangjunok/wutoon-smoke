// 普通加载路由
// import store from './store.vue'
// 懒加载路由
const Store = () => import('./Store.vue')

export default {
  path: '/store',
  name: 'store',
  component: Store,
  children: [
  ]
}