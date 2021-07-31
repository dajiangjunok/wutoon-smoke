import * as types from './types.js'
import { Toast } from 'vant'
import { getCouponList } from '@/services/services_mktCouponUser'

export default {
  namespaced: true,
  state: {
    couponList: []
  },
  mutations: {
    updateCouponList (state, context) {
      state.couponList = context
    }
  },
  actions: {
    async getCouponList (store, payload) {
      try {
        const res = await getCouponList(payload)
        if (res.code != 0) {
          Toast(res.msg);
        } else {
          store.commit('updateCouponList', res.data)
        }
      } catch (error) {
        // Toast(error.msg);
        console.log(error);
      }

    }
  },
  getters: {
    // 可使用 判断useStatus为0 
    usableCouponList (state) {
      const couponList = state.couponList.filter(item => {
        return item.useStatus == 0
      })
      return couponList
    },
    // 已使用
    unavailableCouponList (state) {
      const couponList = state.couponList.filter(item => {
        return item.useStatus == 1
      })
      return couponList
    }
    // 已过期
  }
}
