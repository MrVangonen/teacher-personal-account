<template>
    <div class="home">
        <v-row align="baseline" dense>
            <v-col xs12 sm6 md3>
                <v-select
                    v-model="currentYear"
                    :items="years"
                    background-color="secondary lighten-3"
                    outlined
                    color="primary"
                    dense
                    label="Учебный год"
                ></v-select>
            </v-col>
            <v-col>
                <div class="text-left text-sm-left">
                    <v-btn :to="'/schedule/timetable'" color="primary" small>
                        График учебного процесса
                        <v-icon right dark>mdi-calendar</v-icon>
                    </v-btn>
                </div>
            </v-col>
        </v-row>
        <v-row justify="center" dense>
            <v-col>
                <v-expansion-panels
                    focusable
                    hover
                    accordion
                    multiple
                    v-model="currentDay"
                >
                    <v-expansion-panel v-for="(day, i) in schedule" :key="i">
                        <v-expansion-panel-header
                            class="primary lighten-1 white--text text-uppercase"
                        >
                            {{ day.text }}
                        </v-expansion-panel-header>
                        <v-expansion-panel-content :class="'white clear-fix'">
                            <div v-if="day.lessons && day.lessons.length">
                                <ScheduleCard
                                    v-for="(lesson, i) in day.lessons"
                                    :key="i"
                                    :lesson="lesson"
                                />
                            </div>
                            <div class="text-center py-2" v-else>
                                <span>
                                    Занятий нет
                                </span>
                            </div>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import ScheduleCard from "../components/ScheduleCard";

export default {
    name: "home",
    components: { ScheduleCard },
    data: () => ({
        currentYear: 0,
        years: [
            {
                text: "2019/2020",
                value: 0
            },
            {
                text: "2018/2019",
                value: 1
            },
            {
                text: "2017/2018",
                value: 2
            },
            {
                text: "2016/2017",
                value: 3
            }
        ],
        days: [
            {
                text: "Понедельник",
                value: 0
            },
            {
                text: "Вторник",
                value: 1
            },
            {
                text: "Среда",
                value: 2
            },
            {
                text: "Четверг",
                value: 3
            },
            {
                text: "Пятница",
                value: 4
            },
            {
                text: "Суббота",
                value: 5
            }
        ],
        schedule: [
            {
                text: "30.12 Понедельник",
                value: 0,
                lessons: [
                    {
                        id: 909,
                        disciplineId: 0,
                        number: 6,
                        startTime: "17:00",
                        endTime: "18:35",
                        title: "Английский язык",
                        type: "Лекция",
                        existingPeriod: "17.09.19 - 18.01.20",
                        cabinet: "205",
                        corps: "ГК"
                    },
                    {
                        id: 101,
                        disciplineId: 0,
                        number: 7,
                        startTime: "18:35",
                        endTime: "19:00",
                        title: "Английский язык",
                        type: "Практика",
                        existingPeriod: "17.09.19 - 18.01.20",
                        cabinet: "205а",
                        corps: "ГК"
                    }
                ]
            },
            {
                text: "31.12 Вторник",
                value: 1
            },
            {
                text: "01.12 Среда",
                value: 2,
                lessons: [
                    {
                        id: 90909,
                        disciplineId: 1,
                        number: 1,
                        startTime: "8:00",
                        endTime: "9:35",
                        title: "Теория игр",
                        type: "Лекция",
                        existingPeriod: "19.01.19 - 01.01.22",
                        cabinet: "102",
                        corps: "ГК"
                    },
                    {
                        id: 12345,
                        disciplineId: 1,
                        number: 2,
                        startTime: "9:45",
                        endTime: "11:00",
                        title: "Теория игр",
                        type: "Практика",
                        existingPeriod: "11.06.19 - 01.01.22",
                        cabinet: "12а",
                        corps: "ГК"
                    }
                ]
            },
            {
                text: "02.12 Четверг",
                value: 3
            },
            {
                text: "03.12 Пятница",
                value: 4
            },
            {
                text: "04.12 Суббота",
                value: 5
            }
        ]
    }),
    computed: {
        currentDay() {
            let currentEngDay = new Date().getDay();
            let currentRusDayWithoutSunDay = currentEngDay === 0 ? null : currentEngDay - 1;
            return [currentRusDayWithoutSunDay];
        }
    },
    methods: {}
};
</script>

<style lang="scss">
.clear-fix {
    & > :first-child {
        padding: 5px 5px 0;
    }
}
</style>
