import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import Http from './utils/http'
import 'element-ui/lib/theme-chalk/index.css'
import './style/checkbox.css'
import VueClipboard from 'vue-clipboard2'
import {loadStyle} from '@/utils/util'
import VueLoading from '@/plugin/loading'
import VueParticles from 'vue-particles'


Vue.use(VueParticles)

Vue.use(VueClipboard)

Vue.config.productionTip = false

/* 全局挂载axios */
Vue.prototype.http = Http

/* iconfont字体图标 */
loadStyle('//at.alicdn.com/t/font_753438_197kso4au51.css')

Vue.use(Element)

/* 挂在loading插件 */
Vue.use(VueLoading)

/* 创建vue实例 */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
