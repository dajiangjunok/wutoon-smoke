import { doGet, doPost, doDelete } from './request.js'

// 获取用户所有优惠券
export function getCouponList (userId) {
  return doPost('/mktCouponUser/getMktCouponUserListByUserId', { userId: userId })
}