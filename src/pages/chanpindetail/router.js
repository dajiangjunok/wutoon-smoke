// 普通加载路由
// import ChanPinDetail from './ChanPinDetail.vue'
// 懒加载路由
const ChanPinDetail = () => import('./ChanPinDetail.vue')
export default {
  path: '/chanpindetail',
  name: 'ChanPinDetail',
  component: ChanPinDetail,
  children: [
  ]
}