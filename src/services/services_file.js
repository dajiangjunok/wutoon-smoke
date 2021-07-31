import { doGet, doPost, doDelete } from './request.js'
import request from './request.js'

// 单文件上传
export function uploadFile (data) {
  return request({
    method: 'post',
    url: "/file/uploadFile",
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: data
  })
}

// 分页查询文件列表
export function getFileList (data) {
  return doPost('/getFileList', data)
}