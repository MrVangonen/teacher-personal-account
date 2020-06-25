import Vue from "vue";
import {
  store
} from '../store/index';
import VueRouter from "vue-router";
import Schedule from "../views/Schedule.vue";
import Start from "../views/Start.vue";
const CurrentLesson = () => Promise.resolve(import("../views/CurrentLesson.vue"));
const PageNotFound = () => Promise.resolve(import("../views/PageNotFound.vue"));
const CurrentDiscipline = () => Promise.resolve(import("../views/CurrentDiscipline.vue"));
const TimeTable = () => Promise.resolve(import("../views/TimeTable.vue"));
const Students = () => Promise.resolve(import("../views/Students.vue"));
const Disciplines = () => Promise.resolve(import("../views/Disciplines.vue"));
const Appeals = () => Promise.resolve(import("../views/Appeals.vue"));

Vue.use(VueRouter);

const routes = [
  {
    // сопоставляется со всем
    path: '*',
    name: "PageNotFound",
    component: PageNotFound
  },
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/schedule",
    name: "schedule",
    component: Schedule,
    meta: {
      rusRoute: "/ Расписание",
      requiresAuth: true
    }
  },
  {
    path: "/login",
    name: "login",
    component: Start,
    meta: {
      rusRoute: "Login",
      requiresVisitor: true
    }
  },
  {
    path: "/schedule/lessons/:id",
    name: "schedule",
    component: CurrentLesson,
    meta: {
      rusRoute: "/ Расписание / Теория игр",
      requiresAuth: true
    }
  },
  {
    path: "/schedule/timetable",
    name: "timetable",
    component: TimeTable,
    meta: {
      rusRoute: "/ Расписание / Учебный-план",
      requiresAuth: true
    }
  },
  {
    path: "/disciplines",
    name: "disciplines",
    component: Disciplines,
    meta: {
      rusRoute: "/ Дисциплины",
      requiresAuth: true
    }
  },
  {
    path: "/disciplines/:id",
    name: "discipline",
    component: CurrentDiscipline,
    meta: {
      rusRoute: "/ Дисциплины / Теория игр",
      requiresAuth: true
    }
  },
  {
    path: "/students",
    name: "students",
    component: Students,
    meta: {
      rusRoute: "/ Студенты",
      requiresAuth: true
    }
  },
  {
    path: "/appeals",
    name: "appeals",
    component: Appeals,
    meta: {
      rusRoute: "/ Заявки",
      requiresAuth: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    return {
      x: 0,
      y: 0
    };
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    console.log(!store.getters.loggedIn)
    if (!store.getters.loggedIn) {
      next({
        name: 'login'
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.getters.loggedIn) {
      next({
        name: 'schedule'
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router;