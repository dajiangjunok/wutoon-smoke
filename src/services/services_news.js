import { doGet, doPost, doDelete } from './request.js'

//  查询资讯列表
export function getNewsList (data) {
  return doPost('/news/getNewslist', data)
}
// 根据id查详情
export function getNewsDetail (id) {
  return doPost('/news/getNewsById', { id: id })
}


