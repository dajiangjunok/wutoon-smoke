// 普通加载路由
// import discount from './discount.vue'
// 懒加载路由
const discount = () => import('./discount.vue')
export default {
  path: '/discount',
  name: 'discount',
  component: discount,
  children: [
  ]
}