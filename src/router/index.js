import Vue from 'vue'
import VueRouter from 'vue-router'
import Schedule from '../views/Schedule.vue'
import TimeTable from '../views/TimeTable.vue'
import Students from '../views/Students.vue'
import Disciplines from '../views/Disciplines.vue'
import Appeals from '../views/Appeals.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/schedule',
  },
  {
    path: '/schedule',
    name: 'schedule',
    component: Schedule
  },
  {
    path: '/schedule/timetable',
    name: 'timetable',
    component: TimeTable
  },
  {
    path: '/disciplines',
    name: 'disciplines',
    component: Disciplines
  },
  {
    path: '/students',
    name: 'students',
    component: Students
  },
  {
    path: '/appeals',
    name: 'appeals',
    component: Appeals
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
