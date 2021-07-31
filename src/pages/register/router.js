// 普通加载路由
// import Register from './Register.vue'
// 懒加载路由
const Register = () => import('./Register.vue')
export default {
  path: '/register',
  name: 'Register',
  component: Register,
  children: [
  ]
}