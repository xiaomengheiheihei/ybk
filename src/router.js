import Vue from 'vue'
import Router from 'vue-router'
import Setting from './views/setting.vue'
import About from './views/About.vue'
import login from './views/login/index.vue'
import editVideo from './views/editVideo.vue'
import Cookies from 'js-cookie'

Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: '/login'
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
  mode: 'history',
  saveScrollPosition: true, 
  routes: routes
})

router.beforeEach((to, from, next) => {
    let token = Cookies.get('Authorization');
    console.log(token)
    if (to.matched.some(record => record.meta.requiresAuth) && (!token || token === null)) {
      next({
           path: '/login',
           query: { redirect: to.fullPath }
          })
    } else {
      if (to.path === '/login' && !!token) {
          next(
            {
              path: '/setting'
            }
          )
      } else {
        next()
      }
    }
});

export default router;
