// 普通加载路由
// import Login from './Login.vue'
// 懒加载路由
const Login = () => import('./Login.vue')
export default {
  path: '/',
  name: 'Login',
  component: Login,
  children: [
  ]
}