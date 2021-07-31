// 普通加载路由
// import profile from './profile.vue'
// 懒加载路由
const Adress = () => import('./Adress.vue')
export default {
  path: '/adress',
  name: 'adress',
  component: Adress,
  props: true,
  children: [
  ]
}