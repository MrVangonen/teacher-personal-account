<template>
    <div>
        <div v-if="discipline">
            <div>
                <v-card elevation="0">
                    <v-card-title
                        class="text-center justify-space-between align-start py-6 grey lighten-5"
                    >
                        <div class="d-flex flex-column align-center">
                            <h1
                                class="font-weight-bold display-3 accent--text pb-2"
                            >
                                {{ discipline.title }}
                            </h1>
                            <span class="mb-2">
                                {{
                                    discipline.existingPeriod.start.toLocaleDateString(
                                        "rus",
                                        {
                                            day: "numeric",
                                            month: "long"
                                        }
                                    )
                                }}
                                -
                                {{
                                    discipline.existingPeriod.end.toLocaleDateString(
                                        "rus",
                                        {
                                            day: "numeric",
                                            month: "long"
                                        }
                                    )
                                }}
                                {{
                                    discipline.existingPeriod.end.toLocaleDateString(
                                        "rus",
                                        {
                                            year: "numeric"
                                        }
                                    )
                                }}
                                г.
                            </span>
                        </div>
                        <div>
                            <div class="d-flex flex-column text-left">
                                <span class="caption">Виды занятия: </span>
                                <div>
                                    <span
                                        class="font-weight-bold discipline-type"
                                        v-for="(type,
                                        index) in discipline.types"
                                        :key="index"
                                        >{{ type }}</span
                                    >
                                </div>
                                <span class="caption">
                                    Форма контроля:
                                </span>
                                <span class="font-weight-bold">
                                    {{ discipline.controlForm }}
                                </span>
                            </div>
                        </div>
                    </v-card-title>
                    <div class="secondary lighten-1">
                        <v-tabs
                            v-model="tab"
                            background-color="transparent"
                            color="primary darken-2"
                        >
                            <v-tab class="font-weight-bold">
                                Текущая ведомость
                            </v-tab>
                            <v-tab class="font-weight-bold">
                                Ведомость сессии
                            </v-tab>
                            <v-tab class="font-weight-bold">
                                Все занятия
                            </v-tab>
                        </v-tabs>
                    </div>
                    <v-tabs-items v-model="tab">
                        <v-tab-item>
                            <v-card flat>
                                <v-card-text class="tab-content-card">
                                    <v-text-field
                                        v-model="currentStatementTableSearch"
                                        append-icon="mdi-account-search"
                                        label="Поиск"
                                        single-line
                                        hide-details
                                    ></v-text-field>
                                    <v-data-table
                                        @input="changeTable()"
                                        :headers="currentStatementTableHeaders"
                                        :items="currentStatementTableData"
                                        :search="currentStatementTableSearch"
                                        item-key="id"
                                        no-data-text="Ничего не найдено"
                                        no-results-text="Ничего не найдено"
                                        :items-per-page="itemsPerPage"
                                    >
                                        <template
                                            v-slot:item.studentName="{ item }"
                                        >
                                            <StudentAvatar
                                                :studentName="item.studentName"
                                                :studentAvatar="
                                                    item.studentAvatar
                                                "
                                            />
                                        </template>
                                        <template v-slot:body="props">
                                            <tr v-for="item in props.items">
                                                <td>
                                                    <StudentAvatar
                                                        :studentName="
                                                            item.studentName
                                                        "
                                                        :studentAvatar="
                                                            item.studentAvatar
                                                        "
                                                    />
                                                </td>
                                                <td
                                                    v-for="(lesson,
                                                    index) in currentStatementLessons"
                                                >
                                                    <TheMarkPicker
                                                        :marks.sync="
                                                            item[
                                                                lesson.value
                                                            ] &&
                                                                item[
                                                                    lesson.value
                                                                ].marks
                                                        "
                                                        :onClick="changeTable"
                                                        :disabled="
                                                            item[
                                                                lesson.value
                                                            ] &&
                                                                !item[
                                                                    lesson.value
                                                                ].attendance
                                                        "
                                                    />
                                                </td>
                                                <td>
                                                    {{ item.totalAttendance }}
                                                </td>
                                                <td>
                                                    {{ item.averageMark }}
                                                </td>
                                            </tr>
                                        </template>
                                    </v-data-table>
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn
                                        color="success mb-4 ml-2"
                                        x-large
                                        :disabled="!isStudentsTableHasChanges"
                                        @click="sendLessonResults()"
                                    >
                                        Сохранить результаты
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-tab-item>
                        <v-tab-item>
                            <v-card flat>
                                <v-card-text class="tab-content-card">
                                    <v-text-field
                                        v-model="sessionStatementTableSearch"
                                        append-icon="mdi-account-search"
                                        label="Поиск"
                                        single-line
                                        hide-details
                                    ></v-text-field>
                                    <v-data-table
                                        @input="changeTable()"
                                        :headers="sessionStatementTableHeaders"
                                        :items="sessionStatementTableData"
                                        :search="sessionStatementTableSearch"
                                        item-key="id"
                                        no-data-text="Ничего не найдено"
                                        no-results-text="Ничего не найдено"
                                        :items-per-page="itemsPerPage"
                                    >
                                        <template
                                            v-slot:item.studentName="{ item }"
                                        >
                                            <StudentAvatar
                                                :studentName="item.studentName"
                                                :studentAvatar="
                                                    item.studentAvatar
                                                "
                                            />
                                        </template>
                                    </v-data-table>
                                </v-card-text>
                            </v-card>
                        </v-tab-item>
                        <v-tab-item>
                            <v-card flat>
                                <v-card-text class="tab-content-card">
                                    <v-text-field
                                        v-model="allLessonsTableSearch"
                                        append-icon="mdi-account-search"
                                        label="Поиск"
                                        single-line
                                        hide-details
                                    ></v-text-field>
                                    <v-data-table
                                        @input="changeTable()"
                                        :headers="allLessonsTableHeaders"
                                        :items="allLessonsTableData"
                                        :search="allLessonsTableSearch"
                                        item-key="id"
                                        no-data-text="Ничего не найдено"
                                        no-results-text="Ничего не найдено"
                                        :items-per-page="itemsPerPage"
                                    >
                                        <template
                                            v-slot:item.studentName="{ item }"
                                        >
                                            <StudentAvatar
                                                :studentName="item.studentName"
                                                :studentAvatar="
                                                    item.studentAvatar
                                                "
                                            />
                                        </template>
                                    </v-data-table>
                                </v-card-text>
                            </v-card>
                        </v-tab-item>
                    </v-tabs-items>
                </v-card>
            </div>
        </div>
        <div class="progress-container" v-else>
            <v-progress-circular
                indeterminate
                color="primary"
            ></v-progress-circular>
        </div>
    </div>
</template>

<script>
import statusEnum from "@/assets/js/enums/statusEnum.js";
import markEnum from "@/assets/js/enums/markEnum.js";
import StudentAvatar from "@/components/shared/StudentAvatar.vue";
import TheMarkPicker from "@/components/TheMarkPicker";

export default {
    data() {
        return {
            discipline: null,
            statusEnum: Object.values(statusEnum),
            markEnum: Object.values(markEnum),
            tab: 0,
            itemsPerPage: 5,
            choosenMark: 0,
            themeFieldDisabled: true,
            homeWorkFieldDisabled: true,
            studentsTableSearch: "",
            isStudentsTableHasChanges: false,
            currentStatementTableSearch: "",
            sessionStatementTableSearch: "",
            allLessonsTableSearch: "",
            currentStatementLessons: [
                {
                    id: 0,
                    text: "17 февраля 2020, 17:00 - 18:35",
                    value: "lesson1",
                    sortable: false,
                    filterable: false
                },
                {
                    id: 1,
                    text: "18 февраля 2020, 17:00 - 18:35",
                    value: "lesson2",
                    sortable: false,
                    filterable: false
                },
                {
                    id: 2,
                    text: "19 февраля 2020, 17:00 - 18:35",
                    value: "lesson3",
                    sortable: false,
                    filterable: false
                },
                {
                    id: 3,
                    text: "21 февраля 2020, 17:00 - 18:35",
                    value: "lesson4",
                    sortable: false,
                    filterable: false
                }
            ],
            currentStatementTableHeaders: [
                // currentStatementLessons in the middle
                {
                    text: "Студент",
                    align: "left",
                    value: "studentName"
                },
                {
                    text: "17 февраля 2020, 17:00 - 18:35",
                    value: "lesson1",
                    sortable: false,
                    filterable: false
                },
                {
                    text: "18 февраля 2020, 17:00 - 18:35",
                    value: "lesson2",
                    sortable: false,
                    filterable: false
                },
                {
                    text: "19 февраля 2020, 17:00 - 18:35",
                    value: "lesson3",
                    sortable: false,
                    filterable: false
                },
                {
                    text: "21 февраля 2020, 17:00 - 18:35",
                    value: "lesson4",
                    sortable: false,
                    filterable: false
                },
                {
                    text: "Посещаемость",
                    value: "totalAttendance",
                    sortable: false,
                    filterable: false
                },
                {
                    text: "Итоговая оценка",
                    value: "averageMark",
                    align: "center",
                    sortable: false,
                    filterable: false
                }
            ],
            currentStatementTableData: [
                {
                    id: 1,
                    studentName: "Иванов И.И.",
                    studentAvatar:
                        "https://cdn.vuetifyjs.com/images/lists/1.jpg",
                    lesson1: {
                        marks: [5, 4, 3, 2],
                        attendance: true
                    },
                    lesson2: {
                        marks: [5, 4, 3],
                        attendance: true
                    },
                    lesson3: {
                        marks: [5],
                        attendance: true
                    },
                    lesson4: {
                        marks: [4],
                        attendance: true
                    },
                    totalAttendance: 18,
                    averageMark: 4
                },
                {
                    id: 2,
                    studentName: "Борисов О.И.",
                    studentAvatar: "",
                    lesson1: {
                        marks: [5, 4, 3, 2],
                        attendance: true
                    },
                    lesson2: {
                        marks: [5, 4, 3],
                        attendance: true
                    },
                    lesson3: {
                        marks: [5],
                        attendance: true
                    },
                    lesson4: {
                        marks: [4],
                        attendance: true
                    },
                    totalAttendance: 18,
                    averageMark: 4
                },
                {
                    id: 3,
                    studentName: "Петрова И.Д.",
                    studentAvatar:
                        "https://cdn.vuetifyjs.com/images/lists/3.jpg",
                    lesson1: {
                        marks: [5, 4, 3, 2],
                        attendance: true
                    },
                    lesson2: {
                        marks: [5, 4, 3],
                        attendance: true
                    },
                    lesson3: {
                        marks: [5],
                        attendance: true
                    },
                    lesson4: {
                        marks: [4],
                        attendance: true
                    },
                    totalAttendance: 17,
                    averageMark: 1
                },
                {
                    id: 4,
                    studentName: "Сидоров К.И.",
                    studentAvatar:
                        "https://cdn.vuetifyjs.com/images/lists/1.jpg",
                    lesson1: {
                        marks: [5, 4, 3, 2],
                        attendance: true
                    },
                    lesson2: {
                        marks: [5, 4, 3],
                        attendance: true
                    },
                    lesson3: {
                        marks: [5],
                        attendance: true
                    },
                    lesson4: {
                        marks: [4],
                        attendance: true
                    },
                    totalAttendance: 18,
                    averageMark: 4
                },
                {
                    id: 5,
                    studentName: "Круг Ш.О.",
                    studentAvatar:
                        "https://cdn.vuetifyjs.com/images/lists/4.jpg",
                    lesson1: {
                        marks: [5, 4, 3, 2],
                        attendance: true
                    },
                    lesson2: {
                        marks: [5, 4, 3],
                        attendance: true
                    },
                    lesson3: {
                        marks: [5],
                        attendance: true
                    },
                    lesson4: {
                        marks: [4],
                        attendance: true
                    },
                    totalAttendance: 18,
                    averageMark: 4
                },
                {
                    id: 6,
                    studentName: "Квадрат Т.Т.",
                    studentAvatar:
                        "https://cdn.vuetifyjs.com/images/lists/5.jpg",
                    lesson1: {
                        marks: [5, 4, 3, 2],
                        attendance: true
                    },
                    lesson2: {
                        marks: [5, 4, 3],
                        attendance: true
                    },
                    lesson3: {
                        marks: [5],
                        attendance: true
                    },
                    lesson4: {
                        marks: [4],
                        attendance: true
                    }
                },
                {
                    id: 6,
                    studentName: "Сажин Ф.И.",
                    studentAvatar:
                        "https://cdn.vuetifyjs.com/images/lists/1.jpg",
                    lesson1: {
                        marks: [5, 4, 3, 2],
                        attendance: true
                    },
                    lesson2: {
                        marks: [5, 4, 3],
                        attendance: true
                    },
                    lesson3: {
                        marks: [5],
                        attendance: true
                    },
                    lesson4: {
                        marks: [4],
                        attendance: true
                    }
                },
                {
                    id: 7,
                    studentName: "Пажин С.И.",
                    studentAvatar:
                        "https://cdn.vuetifyjs.com/images/lists/1.jpg",
                    lesson1: {
                        marks: [5, 4, 3, 2],
                        attendance: true
                    },
                    lesson2: {
                        marks: [5, 4, 3],
                        attendance: true
                    },
                    lesson3: {
                        marks: [5],
                        attendance: true
                    },
                    lesson4: {
                        marks: [4],
                        attendance: true
                    }
                },
                {
                    id: 8,
                    studentName: "Важин В.И.",
                    studentAvatar:
                        "https://cdn.vuetifyjs.com/images/lists/1.jpg",
                    lesson1: {
                        marks: [5, 4, 3, 2],
                        attendance: true
                    },
                    lesson2: {
                        marks: [5, 4, 3],
                        attendance: true
                    },
                    lesson3: {
                        marks: [5],
                        attendance: true
                    },
                    lesson4: {
                        marks: [4],
                        attendance: true
                    }
                },
                {
                    id: 9,
                    studentName: "Квадро И.В.",
                    studentAvatar:
                        "https://cdn.vuetifyjs.com/images/lists/1.jpg",
                    lesson1: {
                        marks: [5, 4, 3, 2],
                        attendance: true
                    },
                    lesson2: {
                        marks: [5, 4, 3],
                        attendance: true
                    },
                    lesson3: {
                        marks: [5],
                        attendance: true
                    },
                    lesson4: {
                        marks: [4],
                        attendance: true
                    }
                }
            ],
            sessionStatementTableHeaders: [
                {
                    text: "Студент",
                    align: "left",
                    value: "studentName"
                },
                {
                    text: "Посещаемость",
                    value: "attendance",
                    sortable: false,
                    filterable: false
                },
                {
                    text: "Средняя оценка",
                    value: "averageMark",
                    align: "center",
                    sortable: false,
                    filterable: false
                },
                {
                    text: "Итоговая оценка",
                    value: "totalMark",
                    align: "center",
                    sortable: false,
                    filterable: false
                }
            ],
            sessionStatementTableData: [
                {
                    id: 1,
                    studentName: "Иванов И.И.",
                    studentAvatar:
                        "https://cdn.vuetifyjs.com/images/lists/1.jpg",
                    attendance: 2,
                    averageMark: 2,
                    totalMark: 3
                },
                {
                    id: 2,
                    studentName: "Борисов О.И.",
                    studentAvatar: "",
                    attendance: 5,
                    averageMark: 5,
                    totalMark: 5
                },
                {
                    id: 3,
                    studentName: "Петрова И.Д.",
                    studentAvatar:
                        "https://cdn.vuetifyjs.com/images/lists/3.jpg",
                    attendance: 3,
                    averageMark: 3,
                    totalMark: 5
                },
                {
                    id: 4,
                    studentName: "Сидоров К.И.",
                    studentAvatar:
                        "https://cdn.vuetifyjs.com/images/lists/1.jpg",
                    attendance: 4,
                    averageMark: 4,
                    totalMark: 5
                },
                {
                    id: 5,
                    studentName: "Круг Ш.О.",
                    studentAvatar:
                        "https://cdn.vuetifyjs.com/images/lists/4.jpg",
                    attendance: 4,
                    averageMark: 4,
                    totalMark: 5
                },
                {
                    id: 6,
                    studentName: "Квадрат Т.Т.",
                    studentAvatar:
                        "https://cdn.vuetifyjs.com/images/lists/5.jpg",
                    attendance: 4,
                    averageMark: 4,
                    totalMark: 5
                }
            ],
            allLessonsTableHeaders: [
                {
                    text: "Урок",
                    align: "left",
                    value: "lesson"
                },
                {
                    text: "Средняя посещаемось",
                    value: "averageAttendance",
                    align: "center",
                    sortable: false,
                    filterable: false
                },
                {
                    text: "Средняя оценка",
                    value: "averageMark",
                    align: "center",
                    sortable: false,
                    filterable: false
                }
            ],
            allLessonsTableData: [
                {
                    id: 1,
                    lesson: "18.02.2020 18:15 - 19:35",
                    averageAttendance: 2,
                    averageMark: 3
                },
                {
                    id: 2,
                    lesson: "19.02.2020 18:15 - 19:35",
                    averageAttendance: 2,
                    averageMark: 3
                },
                {
                    id: 3,
                    lesson: "20.02.2020 18:15 - 19:35",
                    averageAttendance: 2,
                    averageMark: 3
                },
                {
                    id: 4,
                    lesson: "21.02.2020 18:15 - 19:35",
                    averageAttendance: 2,
                    averageMark: 3
                },
                {
                    id: 5,
                    lesson: "22.02.2020 18:15 - 19:35",
                    averageAttendance: 2,
                    averageMark: 3
                }
            ]
        };
    },
    components: {
        StudentAvatar,
        TheMarkPicker
    },
    mounted() {
        this.getCurrentDisciplineData(this.$route.params.id);
    },
    computed: {
        currentStatementDataIndex() {
            desserts
                .map(function(x) {
                    return x.id;
                })
                .indexOf(item.id);
        }
    },
    methods: {
        getCurrentDisciplineData(id) {
            let promise = new Promise((res, rej) => {
                setTimeout(() => {
                    this.discipline = {
                        id: 1,
                        title: "Теория игр",
                        controlForm: "Экзамен",
                        types: ["Лекция", "Практика"],
                        totalLessonsCount: 30,
                        existingPeriod: {
                            start: new Date(2020, 1, 9),
                            end: new Date(2020, 6, 9)
                        }
                    };
                    res("ok");
                }, 100);
            });
        },
        changeTable() {
            !this.isStudentsTableHasChanges
                ? (this.isStudentsTableHasChanges = true)
                : false;
        },
        sendLessonResults() {
            this.isStudentsTableHasChanges = false;
            console.log("send data about discipline");
        },
        changeLessonStatus() {
            console.log("change discipline status");
        }
    }
};
</script>

<style lang="scss">
/* fix tabs slider on mobile */
.v-slide-group__prev {
    display: none !important;
}

.box-card {
    height: 50px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    color: black;
}

.progress-container {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.status-btn {
    min-width: 195px;
}

.tab-content-card {
    min-height: 100vh;
}

.discipline-type {
    &:not(:last-child) {
        &::after {
            content: ", ";
        }
    }
}
</style>
