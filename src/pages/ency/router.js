// 普通加载路由
// import ency from './ency.vue'
// 懒加载路由
const ency = () => import('./Ency.vue')
export default {
  path: '/ency',
  name: 'ency',
  component: ency,
  children: [
  ]
}