<template>
    <div class="home">
        <div class="o-grid align-baseline justify-space-between">
            <div class="col size-12 sm:size-5 md:size-4">
                <v-select
                    v-model="currentYear"
                    :items="years"
                    background-color="secondary lighten-3"
                    outlined
                    color="primary"
                    dense
                    label="Учебный год"
                ></v-select>
            </div>
            <div class="col fit-content">
                <div class="text-left text-sm-left">
                    <v-btn :to="'/schedule/timetable'" color="primary">
                        График учебного процесса
                        <v-icon right dark>mdi-calendar</v-icon>
                    </v-btn>
                </div>
            </div>
        </div>
        <v-row dense>
            <v-col class="d-flex align-center">
                <v-btn
                    x-large
                    text
                    icon
                    color="accent"
                    @click="sendRequestForSchedule()"
                >
                    <v-icon>
                        mdi-arrow-left-bold-box
                    </v-icon>
                </v-btn>
                <div class="d-flex flex-wrap justify-center mr-2">
                    <span class="time-range">
                        {{
                            scheduleData.range.start.toLocaleDateString("rus", {
                                month: "long",
                                day: "numeric"
                            })
                        }}
                        -
                        {{
                            scheduleData.range.end.toLocaleDateString("rus", {
                                month: "long",
                                day: "numeric"
                            })
                        }}
                    </span>
                    <span class="time-range">
                        ,
                        <b>
                            {{ scheduleData.range.weekName }}
                        </b>
                    </span>
                </div>
                <v-btn
                    x-large
                    text
                    icon
                    color="accent"
                    @click="sendRequestForSchedule()"
                >
                    <v-icon>
                        mdi-arrow-right-bold-box
                    </v-icon>
                </v-btn>
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-menu
                    v-model="datePickerMenu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="240px"
                >
                    <template v-slot:activator="{ on }">
                        <v-text-field
                            v-model="dateToLocaleDateString"
                            label="Выберите дату"
                            append-icon="mdi-calendar"
                            outlined
                            color="primary"
                            shaped
                            readonly
                            v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker
                        v-model="dateForDatePicker"
                        locale="ru"
                        :first-day-of-week="1"
                        @input="datePickerMenu = false"
                        @change="sendRequestForSchedule()"
                    ></v-date-picker>
                </v-menu>
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
                    <v-expansion-panel
                        v-for="(day, i) in scheduleData.schedule"
                        :key="i"
                    >
                        <v-expansion-panel-header
                            class="primary lighten-1 white--text text-uppercase"
                        >
                            <span>
                                {{
                                    day.date.toLocaleDateString("rus", {
                                        month: "numeric",
                                        day: "numeric"
                                    })
                                }}
                                {{
                                    day.date.toLocaleDateString("rus", {
                                        weekday: "long"
                                    })
                                }}
                            </span>
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
        dateForDatePicker: new Date().toISOString().substr(0, 10),
        datePickerMenu: false,
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
        scheduleData: {
            range: {
                start: new Date(2020, 0, 20),
                end: new Date(2020, 0, 25),
                weekName: "числитель"
            },
            schedule: [
                {
                    date: new Date(2020, 0, 20),
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
                    date: new Date(2020, 0, 21),
                    value: 1
                },
                {
                    date: new Date(2020, 0, 22),
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
                    date: new Date(2020, 0, 23),
                    value: 3
                },
                {
                    date: new Date(2020, 0, 24),
                    value: 4
                },
                {
                    date: new Date(2020, 0, 25),
                    value: 5
                }
            ]
        }
    }),
    computed: {
        currentDay: {
            get() {
                let currentEngDay = new Date().getDay();
                let currentRusDayWithoutSunDay =
                    currentEngDay === 0 ? null : currentEngDay - 1;
                return [currentRusDayWithoutSunDay];
            },
            set(newName) {
                return newName;
            }
        },
        dateToLocaleDateString() {
            return new Date(this.dateForDatePicker).toLocaleDateString("rus");
        }
    },
    methods: {
        sendRequestForSchedule() {
            console.log("request is going");
        }
    }
};
</script>

<style lang="scss">
.v-text-field__details {
    //fix select
    display: none !important;
}

.time-range {
    white-space: nowrap;
}

.clear-fix {
    & > :first-child {
        padding: 5px 5px 0;
    }
}
</style>
