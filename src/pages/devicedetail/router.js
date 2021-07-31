// 普通加载路由
// import DeviceDetail from './DeviceDetail.vue'
// 懒加载路由
const DeviceDetail = () => import('./DeviceDetail.vue')
export default {
  path: '/devicedetail',
  name: 'DeviceDetail',
  component: DeviceDetail,
  children: [
  ]
}