import Vue from 'vue'
import VueRouter from 'vue-router'
import Shedule from '../views/Shedule.vue'
import Students from '../views/Students.vue'
import Home from '../views/Home.vue'
import About from '../views/About.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'shedule',
    component: Shedule
  },
  {
    path: '/students',
    name: 'students',
    component: Students
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: About
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
