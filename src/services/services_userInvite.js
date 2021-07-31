import { doGet, doPost, doDelete } from './request.js'

// 客户端查询用户信息通过用户id
export function getCountByUserId (userId) {
  return doPost(`/userInvite/getCountByUserId`, { sourceUserId: userId })
}

// 客户端查询用户信息通过用户id
export function getInviteFriends () {
  return doGet(`/userInvite/inviteFriends`)
}