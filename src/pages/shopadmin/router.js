// 普通加载路由
// import ShopAdmin from './ShopAdmin.vue'
// 懒加载路由
const ShopAdmin = () => import('./ShopAdmin.vue')
export default {
  path: '/shopadmin',
  name: 'ShopAdmin',
  component: ShopAdmin,
  children: [
  ]
}