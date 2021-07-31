// 普通加载路由
// import IdCard from './IdCard.vue'
// 懒加载路由
const IdCard = () => import('./IdCard.vue')
export default {
  path: '/idcard',
  name: 'IdCard',
  component: IdCard,
  children: [
  ]
}