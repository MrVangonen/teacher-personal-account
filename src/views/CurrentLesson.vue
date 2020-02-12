<template>
    <div>
        <div v-if="lesson">
            <div>
                <v-card>
                    <v-card-title
                        class="text-center justify-space-between align-start py-6"
                    >
                        <div>
                            <h1
                                class="font-weight-bold display-3 primary--text pb-2"
                            >
                                {{ lesson.title }}
                            </h1>
                            <span>
                                {{
                                    lesson.date.toLocaleDateString("rus", {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric"
                                    })
                                }}
                                ,
                                <b
                                    >{{ lesson.startTime }} -
                                    {{ lesson.endTime }}
                                </b>
                            </span>
                        </div>
                        <div>
                            <div class="d-flex flex-column text-left">
                                <span class="caption">Вид занятия: </span>
                                <span class="font-weight-bold">{{
                                    lesson.type
                                }}</span>
                            </div>
                            <div class="text-left">
                                <span class="caption">Статус: </span>
                                <v-overflow-btn
                                    class="status-btn mt-0"
                                    v-model="lesson.status"
                                    :items="statusEnum"
                                    :background-color="
                                        currentLessonStatusObject.color
                                    "
                                    :disabled="
                                        currentLessonStatusObject.disabled
                                    "
                                    @click=""
                                    dark
                                    label="Статус занятия"
                                ></v-overflow-btn>
                            </div>
                        </div>
                    </v-card-title>
                    <v-tabs
                        v-model="tab"
                        background-color="transparent"
                        color="accent"
                        grow
                    >
                        <v-tab>
                            Оценки и посещаемость
                        </v-tab>
                        <v-tab>
                            Материалы занятия
                        </v-tab>
                    </v-tabs>
                    <v-tabs-items v-model="tab">
                        <v-tab-item>
                            <v-card flat>
                                <v-card-text class="tab-content-card">
                                    <v-card-title>
                                        <v-text-field
                                            v-model="studentsTableSearch"
                                            append-icon="mdi-account-search"
                                            label="Поиск"
                                            single-line
                                            hide-details
                                        ></v-text-field>
                                    </v-card-title>
                                    <v-data-table
                                        v-model="studentsTableSelected"
                                        @input="changeTable()"
                                        :headers="studentsTableHeaders"
                                        :items="studentsTableData"
                                        :search="studentsTableSearch"
                                        item-key="studentName"
                                        no-data-text="Ничего не найдено"
                                        no-results-text="Ничего не найдено"
                                        :items-per-page="itemsPerPage"
                                        show-select
                                    >
                                        <template
                                            v-slot:item.studentName="{ item }"
                                        >
                                            <v-avatar
                                                size="32"
                                                color="primary"
                                                class="mr-2"
                                            >
                                                <img
                                                    v-if="item.studentAvatar"
                                                    :src="item.studentAvatar"
                                                />
                                                <span
                                                    class="white--text"
                                                    v-else
                                                    >{{
                                                        item.studentName[0]
                                                    }}</span
                                                >
                                            </v-avatar>
                                            <span class="font-weight-bold">
                                                {{ item.studentName }}
                                            </span>
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
                        <v-tab-item>
                            <v-card flat>
                                <v-card-text>
                                    <v-card class="mb-2">
                                        <v-card-text>
                                            <b>Тема</b>
                                            <v-text-field
                                                v-model="lesson.theme"
                                                :disabled="themeFieldDisabled"
                                                single-line
                                            >
                                            </v-text-field>
                                        </v-card-text>
                                        <v-card-actions>
                                            <v-btn
                                                dark
                                                color="black accent-4 mx-auto"
                                                @click="
                                                    themeFieldDisabled = !themeFieldDisabled
                                                "
                                            >
                                                <v-icon>mdi-pencil</v-icon>
                                            </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                    <v-card class="mb-2">
                                        <v-card-text>
                                            <b>Домашнее задание</b>
                                            <v-textarea
                                                v-model="lesson.homeWork"
                                                :disabled="
                                                    homeWorkFieldDisabled
                                                "
                                                counter
                                                rows="4"
                                                maxlength="120"
                                                full-width
                                                single-line
                                            ></v-textarea>
                                        </v-card-text>
                                        <v-card-actions>
                                            <v-btn
                                                dark
                                                color="black accent-4 mx-auto"
                                                @click="
                                                    homeWorkFieldDisabled = !homeWorkFieldDisabled
                                                "
                                            >
                                                <v-icon>mdi-pencil</v-icon>
                                            </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                    <v-card>
                                        <v-card-text>
                                            <b>Файлы</b>
                                            <div
                                                class="d-flex align-center mb-1"
                                                v-for="(file,
                                                index) in lesson.files"
                                                :key="index"
                                            >
                                                <img
                                                    width="40px"
                                                    :src="
                                                        require('@/assets/file-model/pdf.png')
                                                    "
                                                    alt=""
                                                />
                                                <span>
                                                    {{ file }}
                                                </span>
                                            </div>
                                        </v-card-text>
                                        <v-card-actions>
                                            <v-btn
                                                dark
                                                color="black accent-4 mx-auto"
                                                @click="
                                                    $refs.inputUpload.click()
                                                "
                                            >
                                                <v-icon>mdi-plus</v-icon>
                                            </v-btn>
                                            <input
                                                v-show="false"
                                                ref="inputUpload"
                                                type="file"
                                                @click=""
                                            />
                                        </v-card-actions>
                                    </v-card>
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
import statusEnum from "../assets/js/enums/statusEnum.js";
import markEnum from "../assets/js/enums/markEnum.js";

export default {
    data() {
        return {
            lesson: null,
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
                    studentName: "Иванов И.И.",
                    studentAvatar:
                        "https://cdn.vuetifyjs.com/images/lists/1.jpg",
                    institute: "ИМИТ",
                    groop: 6,
                    cyberTrack: "+ 2 файла",
                    marks: []
                },
                {
                    studentName: "Борисов О.И.",
                    studentAvatar: "",
                    institute: "ИМИТ",
                    groop: 9,
                    cyberTrack: "+ 1 файла",
                    marks: []
                },
                {
                    studentName: "Петрова И.Д.",
                    studentAvatar:
                        "https://cdn.vuetifyjs.com/images/lists/3.jpg",
                    institute: "ИМИТ",
                    groop: 16,
                    cyberTrack: "+ 3 файла",
                    marks: []
                },
                {
                    studentName: "Сидоров К.И.",
                    studentAvatar:
                        "https://cdn.vuetifyjs.com/images/lists/1.jpg",
                    institute: "ИМИТ",
                    groop: 3,
                    cyberTrack: "",
                    marks: []
                },
                {
                    studentName: "Круг Ш.О.",
                    studentAvatar:
                        "https://cdn.vuetifyjs.com/images/lists/4.jpg",
                    institute: "ИМИТ",
                    groop: 16,
                    cyberTrack: "",
                    marks: []
                },
                {
                    studentName: "Квадрат Т.Т.",
                    studentAvatar:
                        "https://cdn.vuetifyjs.com/images/lists/5.jpg",
                    institute: 375,
                    groop: 0.0,
                    cyberTrack: "+ 2 файла",
                    marks: []
                },
                {
                    studentName: "Сажин Ф.И.",
                    studentAvatar:
                        "https://cdn.vuetifyjs.com/images/lists/1.jpg",
                    institute: 392,
                    groop: 0.2,
                    cyberTrack: "",
                    marks: []
                },
                {
                    studentName: "Пажин С.И.",
                    studentAvatar:
                        "https://cdn.vuetifyjs.com/images/lists/1.jpg",
                    institute: 408,
                    groop: 3.2,
                    cyberTrack: "",
                    marks: []
                },
                {
                    studentName: "Важин В.И.",
                    studentAvatar:
                        "https://cdn.vuetifyjs.com/images/lists/1.jpg",
                    institute: 452,
                    groop: 25.0,
                    cyberTrack: "+ 2 файла",
                    marks: []
                },
                {
                    studentName: "Квадро И.В.",
                    studentAvatar:
                        "https://cdn.vuetifyjs.com/images/lists/1.jpg",
                    institute: 518,
                    groop: 26.0,
                    cyberTrack: "",
                    marks: []
                }
            ],
            studentsTableSelected: [
            ]
        };
    },
    mounted() {
        this.getCurrentLessonData(this.$route.params.id);
    },
    watch: {},
    computed: {
        currentLessonStatusObject() {
            return this.statusEnum.find(status => {
                return this.lesson.status === status.value;
            });
        }
    },
    methods: {
        getCurrentLessonData(id) {
            let promise = new Promise((res, rej) => {
                setTimeout(() => {
                    this.lesson = {
                        id: 90909,
                        disciplineId: 1,
                        number: 1,
                        startTime: "8:00",
                        endTime: "9:35",
                        title: "Теория игр",
                        theme:
                            "Иностранный язык в истории государтсва российского",
                        homeWork:
                            "1. Сделать задание из прикреплённого файла\n2. Сравнить с расчётами",
                        files: ["file1.pdf", "расчеты.pdf"],
                        type: "Лекция",
                        date: new Date(2020, 1, 9),
                        existingPeriod: "19.01.19 - 01.01.22",
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
            console.log("send data about lesson");
        }
    }
};
</script>

<style scoped>
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
</style>
