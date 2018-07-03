import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import Http from './utils/http'
import 'element-ui/lib/theme-chalk/index.css'

require('./utils/mock')

Vue.config.productionTip = false
Vue.prototype.http = Http

Vue.use(Element)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
