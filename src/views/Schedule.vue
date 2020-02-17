<template>
    <div class="home">
        <div class="o-grid align-baseline justify-space-between">
            <div class="col size-12 sm:size-5 md:size-4 mb-4">
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
                            v-model="convertDatePickerDatesForTextField"
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
                        v-model="datesForDatePicker"
                        locale="ru"
                        no-title
                        show-week
                        dark
                        :first-day-of-week="1"
                        @input="datePickerMenu = false"
                        @change="sendRequestForSchedule()"
                        range
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
                        :disabled="day.disabled"
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
        datesForDatePicker: Array,
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
        scheduleData: Object
    }),
    created() {
        //default data
        this.scheduleData = {
            range: {
                start: new Date(),
                end: this.DateAddDays(new Date(), 6),
                weekName: "числитель"
            },
            schedule: [
                {
                    date: new Date(),
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
                    date: this.DateAddDays(new Date(), 1),
                    value: 1
                },
                {
                    date: this.DateAddDays(new Date(), 2),
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
                    date: this.DateAddDays(new Date(), 3),
                    value: 3
                },
                {
                    date: this.DateAddDays(new Date(), 4),
                    value: 4
                },
                {
                    date: this.DateAddDays(new Date(), 5),
                    value: 5
                },
                {
                    date: this.DateAddDays(new Date(), 6),
                    disabled: true,
                    value: 6
                }
            ]
        };

        this.datesForDatePicker = [
            this.convertDayForDatePicker(this.scheduleData.range.start),
            this.convertDayForDatePicker(this.scheduleData.range.end)
        ];
    },
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
        convertDatePickerDatesForTextField() {
            if (Array.isArray(this.datesForDatePicker)) {
                if (this.datesForDatePicker.length === 2) {
                    return `${new Date(
                        this.datesForDatePicker[0]
                    ).toLocaleDateString("rus")} ~ ${new Date(
                        this.datesForDatePicker[1]
                    ).toLocaleDateString("rus")}`;
                } else if (this.datesForDatePicker.length === 1) {
                    return this.firstAndLastDayOfWeek();
                }
            }
        },
        firstAndLastDayOfWeek() {
            //TODO: лучше обробатывать даты на бакэнде
            let date = new Date(this.datesForDatePicker[0]);
            let rusDayOfWeek = this.rusDayOfWeek(date);
            let monday = this.DateSubDays(date, rusDayOfWeek);
            let sunday = this.DateAddDays(monday, 6);
            this.datesForDatePicker = [
                this.convertDayForDatePicker(monday),
                this.convertDayForDatePicker(sunday)
            ];
            return `${monday} ~ ${sunday}`;
        }
    },
    methods: {
        sendRequestForSchedule() {
            console.log("request is going");
        },
        DateAddDays(date, daysCount) {
            let dateCopy = new Date(date.getTime());
            return new Date(dateCopy.setDate(dateCopy.getDate() + daysCount));
        },
        DateSubDays(date, daysCount) {
            let dateCopy = new Date(date.getTime());
            return new Date(dateCopy.setDate(dateCopy.getDate() - daysCount));
        },
        rusDayOfWeek(date) {
            return date.getDay() === 0 ? 6 : date.getDay() - 1;
        },
        convertDayForDatePicker(day) {
            return day.toISOString().substr(0, 10);
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
