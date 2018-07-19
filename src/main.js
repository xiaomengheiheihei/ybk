import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import Http from './utils/http'
import 'element-ui/lib/theme-chalk/index.css'
import VueClipboard from 'vue-clipboard2'
import {loadStyle} from '@/utils/util'
 
Vue.use(VueClipboard)

// require('./utils/mock')

Vue.config.productionTip = false
Vue.prototype.http = Http
loadStyle('//at.alicdn.com/t/font_753438_qcpvpnhez7f.css');

Vue.use(Element)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
