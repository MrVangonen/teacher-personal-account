import Vue from "vue";
import VueRouter from "vue-router";
import Schedule from "../views/Schedule.vue";
const CurrentLesson = () =>  Promise.resolve(import("../views/CurrentLesson.vue"));
const CurrentDiscipline = () =>  Promise.resolve(import("../views/CurrentDiscipline.vue"));
const TimeTable = () =>  Promise.resolve(import("../views/TimeTable.vue"));
const Students = () =>  Promise.resolve(import("../views/Students.vue"));
const Disciplines = () =>  Promise.resolve(import("../views/Disciplines.vue"));
const Appeals = () =>  Promise.resolve(import("../views/Appeals.vue"));

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
        path: "/schedule/lessons/:id",
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
        path: "/disciplines/:id",
        name: "discipline",
        component: CurrentDiscipline,
        meta: {
            rusRoute: "/ Расписание / Дисциплина"
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
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 };
    }
});

export default router;
