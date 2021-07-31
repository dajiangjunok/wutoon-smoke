import axios from 'axios';
import router from '../router';
import store from '../store';
import { Toast } from 'vant'

import { BASE_URL, TIMEOUT } from "./config";

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  // headers: {
  //   Accept: 'application/json',
  //   'Content-Type': 'application/json',
  //   'X-Requested-With': 'XMLHttpRequest'
  // },
});

instance.interceptors.request.use(config => {
  // 1.发送网络请求时, 在界面的中间位置显示Loading的组件
  // 2.某一些请求要求用户必须携带token, 如果没有携带, 那么直接跳转到登录页面
  config.headers['Authorization'] = store.state.app.token
  // 3.params/data序列化的操作
  return config;
}, err => {
  console.log(err);
});

instance.interceptors.response.use(res => {
  if (res.data.code == 401) {
    return router.replace('/')
  }
  if (res.data.code != 0) {
    Toast(res.data.msg)
    console.log(res);
  }
  return res.data;
}, err => {
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        console.log("请求错误");
        // Toast("请求错误")
        break;
      case 401:
        console.log("未授权访问");
        // Toast("未授权访问")
        router.replace('/')
        break;
      case 404:
        console.log("页面找不到");
        // Toast("页面找不到")
        router.replace('/')
        break;
      default:
        console.log("其他错误信息");
      // Toast("页面找不到")
      // Toast("其他错误信息")

    }
  }
  return err;
});

export function doGet (url, data = {}, pagesize, pageindex = 1, config) {
  const params = { ...data }
  if (pagesize) {
    params.per_page = pagesize
    params.page = pageindex
  }

  return instance.get(url, { ...config, params })
}

export function doPost (url, data = {}, config) {
  return instance.post(url, data, config)
}

export function doPatch (url, data = {}) {
  return instance.patch(url, data)
}

export function doPut (url, data = {}) {
  return instance.put(url, data)
}

export function doDelete (url) {
  return instance.delete(url)
}

// 仅开发调试时使用
if (process.env.NODE_ENV === 'development') {
  window.http = instance
}

export default instance;

