import Vue from 'vue'
import Router from 'vue-router'
import Timers from '@/components/Timers'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Timers
    }
  ]
})
