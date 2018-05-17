import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'

Vue.use(Router)

export default new Router({
  // Switch the mode to history to get rid of the hashbag in the URL
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
  ]
})
