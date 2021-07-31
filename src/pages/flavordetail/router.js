// 普通加载路由
// import FlavorDetail from './FlavorDetail.vue'
// 懒加载路由
const FlavorDetail = () => import('./FlavorDetail.vue')
export default {
  path: '/flavordetail',
  name: 'FlavorDetail',
  component: FlavorDetail,
  children: [
  ]
}