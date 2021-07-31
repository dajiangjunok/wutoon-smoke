import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import VueClipboard from 'vue-clipboard2'
import 'vant/lib/index.css';

import '@/assets/styles/common.scss'
Vue.config.productionTip = false

// 定死一个商品id
// const productIdG = 'spu1428188771123232'  //定死烟杆产品
// const productIdD = 'spu1428188666265632' //定死烟弹产品

const productIdG = 'spu1427166529060896'  //定死烟杆产品
const productIdD = 'spu1427168934494240' //定死烟弹产品

Vue.prototype.$productIdG = productIdG
Vue.prototype.$productIdD = productIdD

Vue.use(Vant)
Vue.use(VueClipboard)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
