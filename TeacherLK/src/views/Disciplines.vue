<template>
    <div>
        <div>
            <div class="mt-2">
                <v-text-field
                    v-model="disciplinesTableSearch"
                    append-icon="mdi-account-search"
                    label="Поиск"
                    single-line
                    hide-details
                ></v-text-field>
                <v-data-table
                    style="cursor: pointer;"
                    @input="changeTable()"
                    :headers="disciplinesTableHeaders"
                    :items="disciplinesTableData"
                    :search="disciplinesTableSearch"
                    item-key="id"
                    no-data-text="Ничего не найдено"
                    no-results-text="Ничего не найдено"
                    :items-per-page="itemsPerPage"
                    @click:row="goToChoosenDiscipline"
                >
                    <template v-slot:item.studentName="{ item }">
                        <StudentAvatar
                            :studentName="item.studentName"
                            :studentAvatar="item.studentAvatar"
                        />
                    </template>
                </v-data-table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data: () => ({
        currentYear: 0,
        years: Array,
        disciplinesTableSearch: "",
        itemsPerPage: 5,
        disciplinesTableHeaders: [
            {
                text: "Дисциплина",
                align: "left",
                value: "discipline"
            },
            {
                text: "Форма обучения",
                value: "learningForm",
                sortable: false,
                filterable: false
            },
            {
                text: "Семестр",
                value: "semestr",
                sortable: false,
                filterable: false
            },
            {
                text: "Факультет",
                value: "faculty",
                sortable: false,
                filterable: false
            },
            {
                text: "Направление",
                value: "direction",
                sortable: false,
                filterable: false
            },
            {
                text: "Занятия (часов)",
                value: "lessonsHours",
                sortable: false,
                filterable: false
            },
            {
                text: "Средняя посещаемость",
                value: "averageAttendance",
                sortable: false,
                filterable: false
            }
        ],
        disciplinesTableData: [
            {
                id: 1,
                discipline: "Теория игр",
                learningForm: "Очная + Заочная",
                semestr: "5",
                faculty: "ИМИТ",
                direction: "ИСИТ",
                lessonsHours: "Практика (20), Лекция (80)",
                averageAttendance: 20
            },
            {
                id: 2,
                discipline: "Микроэлектроника",
                learningForm: "Заочная",
                semestr: "5",
                faculty: "ИМИТ",
                direction: "ИСИТ",
                lessonsHours: "Практика (20), Лекция (80)",
                averageAttendance: 20
            },
            {
                id: 3,
                discipline: "Администрирование",
                learningForm: "Заочная",
                semestr: "5",
                faculty: "ИМИТ",
                direction: "ИСИТ",
                lessonsHours: "Практика (20), Лекция (80)",
                averageAttendance: 20
            },
            {
                id: 4,
                discipline: "Теория вроятности",
                learningForm: "Очная",
                semestr: "5",
                faculty: "ИМИТ",
                direction: "ИСИТ",
                lessonsHours: "Практика (20), Лекция (80)",
                averageAttendance: 20
            },
            {
                id: 5,
                discipline: "Компьютерная графика",
                learningForm: "Очная",
                semestr: "5",
                faculty: "ИМИТ",
                direction: "ИСИТ",
                lessonsHours: "Практика (20), Лекция (80)",
                averageAttendance: 20
            }
        ]
    }),
    created() {
        //default data - генериться на бакэнде!
        this.years = [
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
        ];
    },
    methods: {
        goToChoosenDiscipline(discipline) {
            this.$router.push({
                path: `disciplines/${discipline.id}`
            });
        }
    }
};
</script>

<style lang="scss">

</style>
