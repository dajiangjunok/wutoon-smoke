// 普通加载路由
// import StoreDetail from './StoreDetail.vue'
// 懒加载路由
const StoreDetail = () => import('./StoreDetail.vue')
export default {
  path: '/storedetail',
  name: 'StoreDetail',
  component: StoreDetail,
  children: [
  ]
}