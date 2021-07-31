import { doGet, doPost, doDelete } from './request.js'

// 注册
export function register (data) {
  return doPost('/users/register', data)
}

// 登陆
export function login (data) {
  return doPost('/users/login', data)
}

// 客户端查询用户信息通过用户id
export function getUserInfo (userId) {
  return doGet(`/users/getUserInfoByUserId`, { userId })
}

// 客户端退出登陆
export function logout () {
  return doPost('/users/logout', {})
}

// 用户实名认证
export function prove (data) {
  return doPost('/users/verified', data)
}

// 修改用户信息
export function updateUserBaseInfo (data) {
  return doPost('/users/updateUserBaseInfo', data)
}

// 修改密码
export function updateUserPassWord (data) {
  return doPost('/users/updateUserPassWord', data)
}

// 用户留言

export function addSuggest (data) {
  return doPost('/userSuggest/insertUserSuggest', data)
}