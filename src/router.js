import Vue from 'vue'
import Router from 'vue-router'
import Setting from './views/setting.vue'
import About from './views/About.vue'
import login from './views/login/index.vue'
import editVideo from './views/editVideo.vue'
import Cookies from 'js-cookie'

Vue.use(Router)

const token = Cookies.get('Authorization');

const routes = [
  {
    path: '/',
    redirect: (to) => {
      if (!!token) {
        return '/setting'
      } else {
        return '/login'
      }
    }
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/setting',
    name: 'setting',
    component: Setting,
    meta: { requiresAuth: true }
  },
  {
    path: '/editVideo',
    name: 'edit',
    component: editVideo,
    meta: { requiresAuth: true }
  },
  {
    path: '/about',
    name: 'about',
    component: About
  }
]
const router = new Router({
  routes: routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth) && (!token || token === null)) {
      next({
           path: '/login',
           query: { redirect: to.fullPath }
          })
    } else {
      next()
    }
    // if (to.matched.some(record => record.meta.requiresAuth) && (!token || token === null)) {
    //   next({
    //    path: '/login',
    //    query: { redirect: to.fullPath }
    //   })
    // } else {
    //   next()
    // }
});

export default router;
