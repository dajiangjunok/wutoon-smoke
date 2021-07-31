import * as types from './types.js'
import { Toast } from 'vant'

import { getUserInfo } from '@/services/services_user'
import { getCountByUserId } from '@/services/services_userInvite'
import { getApproveInfo } from '@/services/services_shop.js'

export default {
  namespaced: true,
  state: {
    currentRoute: '/',
    token: '',
    userId: '',
    userInfo: {},
    userCount: 0,
    verified: false,
    avatarImg: '',
    approveStatus: '',
    shopId: ''
  },
  mutations: {
    changeRoute (state, context) {
      state.currentRoute = context
    },
    // 更新通证
    updateToken (state, context) {
      state.token = context
    },
    // 更新用户id
    updateUserId (state, context) {
      state.userId = context
    },
    // 更新当前用户信息
    updateUserInfo (state, context) {
      state.userInfo = context
    },
    // 更新当前用户邀请人数
    updateUserCount (state, context) {
      state.userCount = context
    },
    // 更新认证状态
    updateVerified (state, context) {
      state.verified = context
    },
    upDateApproveStatus (state, context) {
      state.approveStatus = context
    },
    updateShopId (state, context) {
      state.shopId = context
    },
    // 清空user
    clearUser (state, context) {
      state.currentRoute = '/'
      state.token = ''
      state.userId = ''
      state.userInfo = {}
      state.userCount = 0
      state.verified = false
      state.approveStatus = ''
    }
  },
  actions: {
    async getUserInfo (context, payload) {
      const res = await getUserInfo(payload)
      return new Promise((resolve, reject) => {
        if (res.code != 0) {
          // Toast(res.msg);
        } else {
          context.commit('updateUserInfo', res.data)
          context.commit('updateVerified', res.data.verified)
          resolve(res.data.verified)
        }
      })
    },
    async getCountByUserId (context, payload) {
      const res = await getCountByUserId(payload)
      if (res.code != 0) {
        // Toast(res.msg);
      } else {
        context.commit('updateUserCount', res.data)

      }
    },
    async getApprove (context, payload) {
      const res = await getApproveInfo()
      if (res.code != 0) {
        // Toast(res.msg);
      } else {
        context.commit('updateShopId', res.data.id)
        context.commit('upDateApproveStatus', res.data.approveStatus)
      }
    }
  },
  getters: {
  }
}
