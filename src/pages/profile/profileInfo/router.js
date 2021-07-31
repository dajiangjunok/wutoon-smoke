// 普通加载路由
// import profile from './profile.vue'
// 懒加载路由
const ProfileInfo = () => import('./ProfileInfo.vue')
export default {
  path: '/profileinfo',
  name: 'profileinfo',
  component: ProfileInfo,
  children: [
  ]
}