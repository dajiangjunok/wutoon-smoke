import { doGet, doPost, doDelete } from './request.js'

// 查询地区  省市区街道
export function getAddressById (id) {
  return doPost('/commAddress/commAddressQueryList', { parentId: id })
}

// 新增地址
export function addAddress (data) {
  return doPost('/userAddress/addUserAddress', data)
}

// 删除地址
export function deleteAddress (data) {
  return doPost('/userAddress/deleteAddressByIds', data)
}

// 获取当前用户所有地址
export function getAddressAll () {
  return doGet('/userAddress/queryUserAllAddressByUserId')
}

// 修改地址
export function editAddress (data) {
  return doPost('/userAddress/updateUserAddress', data)
}

// 查找默认地址
export function getDefaultAddress () {
  return doPost('/userAddress/queryDefaultAddress')
}

// 查询具体单条地址信息
export function getAddressOne (id) {
  return doPost('/userAddress/queryUserAddressById', { id })
}


