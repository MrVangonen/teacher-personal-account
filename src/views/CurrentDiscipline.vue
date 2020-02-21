<template>
    <div>
        <div v-if="discipline">
            <div>
                <v-card>
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
                                        v-model="studentsTableSearch"
                                        append-icon="mdi-account-search"
                                        label="Поиск"
                                        single-line
                                        hide-details
                                    ></v-text-field>
                                    <v-data-table
                                        v-model="studentsTableSelected"
                                        @input="changeTable()"
                                        :headers="studentsTableHeaders"
                                        :items="studentsTableData"
                                        :search="studentsTableSearch"
                                        item-key="id"
                                        no-data-text="Ничего не найдено"
                                        no-results-text="Ничего не найдено"
                                        :items-per-page="itemsPerPage"
                                        show-select
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
                                        <template v-slot:item.marks="{ item }">
                                            <div class="my-2">
                                                <div v-if="item.marks.length">
                                                    <v-icon
                                                        v-for="(mark,
                                                        index) in item.marks"
                                                        :key="index"
                                                        :color="mark.color"
                                                        >{{ mark.icon }}</v-icon
                                                    >
                                                </div>
                                                <div v-else>
                                                    Нет оценок
                                                </div>
                                            </div>
                                            <v-menu left offset-x>
                                                <template
                                                    v-slot:activator="{ on }"
                                                >
                                                    <v-btn
                                                        fab
                                                        dark
                                                        class="mb-2"
                                                        x-small
                                                        v-on="on"
                                                    >
                                                        <v-icon
                                                            >mdi-plus</v-icon
                                                        >
                                                    </v-btn>
                                                </template>
                                                <v-list>
                                                    <v-list-item-group
                                                        v-model="item.marks"
                                                        multiple
                                                    >
                                                        <v-list-item
                                                            v-for="(mark,
                                                            index) in markEnum"
                                                            :key="index"
                                                            :value="mark"
                                                            @click="
                                                                changeTable()
                                                            "
                                                        >
                                                            <v-list-item-title>
                                                                {{ mark.text }}
                                                            </v-list-item-title>
                                                            <v-icon
                                                                :color="
                                                                    mark.color
                                                                "
                                                                >{{
                                                                    mark.icon
                                                                }}</v-icon
                                                            >
                                                        </v-list-item>
                                                    </v-list-item-group>
                                                </v-list>
                                            </v-menu>
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
                                        Отправить результаты
                                    </v-btn>
                                </v-card-actions>
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
            studentsTableHeaders: [
                {
                    text: "Студент",
                    align: "left",
                    value: "studentName"
                },
                { text: "Институт", value: "institute", sortable: false },
                { text: "Группа", value: "groop", sortable: false },
                {
                    text: "Цифровой след",
                    value: "cyberTrack",
                    sortable: false,
                    filterable: false
                },
                {
                    text: "Оценки",
                    value: "marks",
                    align: "center",
                    sortable: false,
                    filterable: false
                }
            ],
            studentsTableData: [
                {
                    id: 1,
                    studentName: "Иванов И.И.",
                    studentAvatar:
                        "https://cdn.vuetifyjs.com/images/lists/1.jpg",
                    institute: "ИМИТ",
                    groop: 6,
                    cyberTrack: "+ 2 файла",
                    marks: []
                },
                {
                    id: 2,
                    studentName: "Борисов О.И.",
                    studentAvatar: "",
                    institute: "ИМИТ",
                    groop: 9,
                    cyberTrack: "+ 1 файла",
                    marks: []
                },
                {
                    id: 3,
                    studentName: "Петрова И.Д.",
                    studentAvatar:
                        "https://cdn.vuetifyjs.com/images/lists/3.jpg",
                    institute: "ИМИТ",
                    groop: 16,
                    cyberTrack: "+ 3 файла",
                    marks: []
                },
                {
                    id: 4,
                    studentName: "Сидоров К.И.",
                    studentAvatar:
                        "https://cdn.vuetifyjs.com/images/lists/1.jpg",
                    institute: "ИМИТ",
                    groop: 3,
                    cyberTrack: "",
                    marks: []
                },
                {
                    id: 5,
                    studentName: "Круг Ш.О.",
                    studentAvatar:
                        "https://cdn.vuetifyjs.com/images/lists/4.jpg",
                    institute: "ИМИТ",
                    groop: 16,
                    cyberTrack: "",
                    marks: []
                },
                {
                    id: 6,
                    studentName: "Квадрат Т.Т.",
                    studentAvatar:
                        "https://cdn.vuetifyjs.com/images/lists/5.jpg",
                    institute: 375,
                    groop: 0.0,
                    cyberTrack: "+ 2 файла",
                    marks: []
                },
                {
                    id: 6,
                    studentName: "Сажин Ф.И.",
                    studentAvatar:
                        "https://cdn.vuetifyjs.com/images/lists/1.jpg",
                    institute: 392,
                    groop: 0.2,
                    cyberTrack: "",
                    marks: []
                },
                {
                    id: 7,
                    studentName: "Пажин С.И.",
                    studentAvatar:
                        "https://cdn.vuetifyjs.com/images/lists/1.jpg",
                    institute: 408,
                    groop: 3.2,
                    cyberTrack: "",
                    marks: []
                },
                {
                    id: 8,
                    studentName: "Важин В.И.",
                    studentAvatar:
                        "https://cdn.vuetifyjs.com/images/lists/1.jpg",
                    institute: 452,
                    groop: 25.0,
                    cyberTrack: "+ 2 файла",
                    marks: []
                },
                {
                    id: 9,
                    studentName: "Квадро И.В.",
                    studentAvatar:
                        "https://cdn.vuetifyjs.com/images/lists/1.jpg",
                    institute: 518,
                    groop: 26.0,
                    cyberTrack: "",
                    marks: []
                }
            ],
            studentsTableSelected: []
        };
    },
    components: {
        StudentAvatar
    },
    mounted() {
        this.getCurrentDisciplineData(this.$route.params.id);
    },
    computed: {},
    methods: {
        getCurrentDisciplineData(id) {
            let promise = new Promise((res, rej) => {
                setTimeout(() => {
                    this.discipline = {
                        id: 1,
                        number: 1,
                        title: "Теория игр",
                        controlForm: "Экзамен",
                        themes: "Теория игр и экономическое моделирование",
                        homeWork:
                            "1. Сделать задание из прикреплённого файла\n2. Сравнить с расчётами",
                        files: ["file1.pdf", "расчеты.pdf"],
                        types: ["Лекция", "Практика"],
                        date: new Date(2020, 1, 9),
                        existingPeriod: {
                            start: new Date(2020, 1, 9),
                            end: new Date(2020, 6, 9)
                        },
                        status: 0,
                        cabinet: "102",
                        corps: "ГК"
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
