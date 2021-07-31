import { doPost } from './request.js'

// 获取店铺标签,产品系列
export function getDicList (data) {
  return doPost('/dictionary/getDictionarylist', data)
}

export function addDic (data) {
  return doPost('/dictionary/insert', data)
}

// 删除字典
export function deleteDic (id) {
  return doPost('/dictionary/deleteDictionaryById', { id })
}


// 修改字典
export function updateDic (data) {
  return doPost('/dictionary/Update', data)
}