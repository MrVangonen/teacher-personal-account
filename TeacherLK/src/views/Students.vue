<template>
    <div>
        <v-text-field
            v-model="studentsTableSearch"
            append-icon="mdi-account-search"
            label="Поиск"
            single-line
            hide-details
        ></v-text-field>
        <v-data-table
            @input="changeTable()"
            :headers="studentsTableHeaders"
            :items="studentsTableData"
            :search="studentsTableSearch"
            item-key="id"
            no-data-text="Ничего не найдено"
            no-results-text="Ничего не найдено"
            :items-per-page="itemsPerPage"
        >
            <template v-slot:item.studentName="{ item }">
                <StudentAvatar
                    :studentName="item.studentName"
                    :studentAvatar="item.studentAvatar"
                />
            </template>
        </v-data-table>
    </div>
</template>

<script>
import StudentAvatar from '@/components/shared/StudentAvatar'

export default {
    data: () => ({
        currentYear: 0,
        years: Array,
        studentsTableSearch: "",
        itemsPerPage: 5,
        studentsTableHeaders: [
            {
                text: "Студент",
                align: "left",
                value: "studentName"
            },
            {
                text: "Группа",
                value: "groop",
                sortable: false,
                filterable: false
            },
            {
                text: "Институт",
                value: "institut",
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
                text: "Форма обучения",
                value: "learningForm",
                sortable: false,
                filterable: false
            },
            {
                text: "Год набора",
                value: "recruitment",
                sortable: false,
                filterable: false
            },
            {
                text: "Курс",
                value: "averageAttendance",
                sortable: false,
                filterable: false
            },
            {
                text: "Дисциплины рабочего плана",
                value: "workPlanDisciplines",
                sortable: false,
                filterable: false
            }
        ],
        studentsTableData: [
            {
                id: 1,
                studentName: "Иванов И.И.",
                studentAvatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
                groop: 22406,
                institut: "ИСИТ",
                direction: "ИМИТ",
                learningForm: "очная",
                recruitment: 2016,
                averageAttendance: 4,
                workPlanDisciplines: "Администрирование"
            },
            {
                id: 2,
                studentName: "Борисов О.И.",
                studentAvatar: "",
                groop: 22301,
                institut: "ИСИТ",
                direction: "ИМИТ",
                learningForm: "очная",
                recruitment: 2017,
                averageAttendance: 4,
                workPlanDisciplines: "Микроэлектроника"
            },
            {
                id: 3,
                studentName: "Петрова И.Д.",
                studentAvatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
                groop: 22504,
                institut: "ИСИТ",
                direction: "ИМИТ",
                learningForm: "заочная",
                recruitment: 2015,
                averageAttendance: 4,
                workPlanDisciplines: "Теория игр"
            },
            {
                id: 4,
                studentName: "Сидоров К.И.",
                studentAvatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
                groop: 22203,
                institut: "ИСИТ",
                direction: "ИМИТ",
                learningForm: "заочная",
                recruitment: 2015,
                averageAttendance: 4,
                workPlanDisciplines: "Теория игр"
            },
            {
                id: 5,
                studentName: "Круг Ш.О.",
                studentAvatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
                groop: 22505,
                institut: "ИСИТ",
                direction: "ИМИТ",
                learningForm: "заочная",
                recruitment: 2015,
                averageAttendance: 3,
                workPlanDisciplines: "Теория игр"
            }
        ]
    }),
    components: {
      StudentAvatar
    },
    created() {}
};
</script>

<style></style>
