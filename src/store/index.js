import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

import * as types from './types';

Vue.use(Vuex)
// 持久化存储插件
const persist = new VuexPersistence({
  storage: window.localStorage,
  key: 'jiaoFuWu',
  modules: ['app', 'home']
})
const plugins = [persist.plugin]

// 动态加载modules
const modules = {}
const files = require.context('./', true, /index\.js$/);
files.keys().filter(key => {
  if (key === './index.js') return false;
  return true
}).map(key => {
  // 获取名字
  const modulePath = key.replace('./modules/', '');
  const moduleName = modulePath.replace('/index.js', '');
  const module = require(`${key}`);

  modules[`${moduleName}`] = module.default;
})

const store = new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  getters: {

  },
  modules: modules,
  plugins: plugins
})

export default store
