import Vue from 'vue'
import Router from 'vue-router'
import Setting from './views/setting.vue'
import About from './views/About.vue'
import editVideo from './views/editVideo.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'setting',
      component: Setting
    },
    {
      path: '/editVideo',
      name: 'edit',
      component: editVideo
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})
