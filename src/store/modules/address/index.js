import * as types from './types.js'
import { getAddressAll, deleteAddress } from '../../../services/services_address'
import { Toast } from 'vant'

export default {
  namespaced: true,
  state: {
    addresList: []
  },
  mutations: {
    updateAddresList (state, context) {
      state.addresList = context
    }
  },
  actions: {
    async getAddressAll (store, payload) {
      try {
        const res = await getAddressAll()
        if (res.code != 0) {
          Toast(res.msg)
        } else {
          store.commit('updateAddresList', res.data)
        }
      } catch (error) {
        Toast(error.msg)
      }
    }
  },
  getters: {
    mapAddresList (state) {
      const addresList = JSON.parse(JSON.stringify(state.addresList))
      const index = state.addresList.findIndex(item => {
        return item.isDefault == 1
      })
      addresList.unshift(addresList[index])
      addresList.splice(index + 1, 1)
      return addresList
    }
  }
}
