import Vue from "vue";
import VueRouter from "vue-router";
import Schedule from "../views/Schedule.vue";
import CurrentLesson from "../views/CurrentLesson.vue";
import TimeTable from "../views/TimeTable.vue";
import Students from "../views/Students.vue";
import Disciplines from "../views/Disciplines.vue";
import Appeals from "../views/Appeals.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        redirect: "/schedule"
    },
    {
        path: "/schedule",
        name: "schedule",
        component: Schedule,
        meta: {
            rusRoute: "/ Расписание"
        }
    },
    {
        path: "/schedule/:id",
        name: "schedule",
        component: CurrentLesson,
        meta: {
            rusRoute: "/ Расписание / Занятие"
        }
    },
    {
        path: "/schedule/timetable",
        name: "timetable",
        component: TimeTable,
        meta: {
            rusRoute: "/ Расписание / Учебный-план"
        }
    },
    {
        path: "/disciplines",
        name: "disciplines",
        component: Disciplines,
        meta: {
            rusRoute: "/ Дисциплины"
        }
    },
    {
        path: "/students",
        name: "students",
        component: Students,
        meta: {
            rusRoute: "/ Студенты"
        }
    },
    {
        path: "/appeals",
        name: "appeals",
        component: Appeals,
        meta: {
            rusRoute: "/ Заявки"
        }
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
});

export default router;
