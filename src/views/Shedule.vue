<template>
    <div class="home">
        <v-row align="baseline" justify="center" dense>
            <v-col cols="12" sm="4">
                <v-select
                    v-model="currentYear"
                    :items="years"
                    value="title"
                    background-color="secondary lighten-3"
                    outlined
                    color="primary"
                    dense
                    label="Учебный год"
                ></v-select>
            </v-col>
            <v-col>
                <div class="text-left text-sm-left">
                    <v-btn color="primary" small>
                        График учебного процесса
                        <v-icon right dark>mdi-calendar</v-icon>
                    </v-btn>
                </div>
            </v-col>
        </v-row>
        <v-row justify="center" dense>
            <v-col>
                <v-expansion-panels focusable hover accordion>
                    <v-expansion-panel v-for="(item, i) in 5" :key="i">
                        <v-expansion-panel-header
                            >Item</v-expansion-panel-header
                        >
                        <v-expansion-panel-content>
                            <!-- <div class="d-flex">
                              <div class="mr-2">
                                <span>
                                  6
                                </span>
                              </div>
                                <div class="mr-2">
                                    <span>
                                        17:00
                                    </span>
                                    <span>
                                        18:35
                                    </span>
                                </div>
                                <div class="d-flex flex-column mr-2">
                                    <b>
                                        Иностранный язык в профессиональной
                                        деятельности
                                    </b>
                                    <span>
                                        Володина Ольга Васильевна
                                    </span>
                                    <span>
                                        16.09.2019 - 29.12.2019
                                    </span>
                                </div>
                                <div class="mr-2">
                                  <span>
                                    Практические занятия 
                                  </span>
                                  <span>
                                    Математика
                                  </span>
                                </div>
                                <div>
                                  1145
                                </div>
                            </div> -->
                            <v-data-table
                                :headers="headers"
                                :items="desserts"
                                hide-default-footer
                                hide-default-header
                            ></v-data-table>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import SheduleCard from "../components/shedule/SheduleCard";

export default {
    name: "home",
    components: { SheduleCard },
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
        headers: [
            {
                text: "Пара",
                align: "left",
                value: "count"
            },
            { text: "Время", value: "calories" },
            { text: "", value: "fat" },
            { text: "Carbs (g)", value: "carbs" },
            { text: "Protein (g)", value: "protein" },
            { text: "Iron (%)", value: "iron" }
        ],
        desserts: [
            {
                name: "Frozen Yogurt",
                calories: 159,
                fat: 6.0,
                carbs: 24,
                protein: 4.0,
                iron: "1%"
            },
            {
                name: "Ice cream sandwich",
                calories: 237,
                fat: 9.0,
                carbs: 37,
                protein: 4.3,
                iron: "1%"
            },
            {
                name: "Eclair",
                calories: 262,
                fat: 16.0,
                carbs: 23,
                protein: 6.0,
                iron: "7%"
            },
            {
                name: "Cupcake",
                calories: 305,
                fat: 3.7,
                carbs: 67,
                protein: 4.3,
                iron: "8%"
            },
            {
                name: "Gingerbread",
                calories: 356,
                fat: 16.0,
                carbs: 49,
                protein: 3.9,
                iron: "16%"
            },
            {
                name: "Jelly bean",
                calories: 375,
                fat: 0.0,
                carbs: 94,
                protein: 0.0,
                iron: "0%"
            },
            {
                name: "Lollipop",
                calories: 392,
                fat: 0.2,
                carbs: 98,
                protein: 0,
                iron: "2%"
            },
            {
                name: "Honeycomb",
                calories: 408,
                fat: 3.2,
                carbs: 87,
                protein: 6.5,
                iron: "45%"
            },
            {
                name: "Donut",
                calories: 452,
                fat: 25.0,
                carbs: 51,
                protein: 4.9,
                iron: "22%"
            },
            {
                name: "KitKat",
                calories: 518,
                fat: 26.0,
                carbs: 65,
                protein: 7,
                iron: "6%"
            }
        ]
    }),
    methods: {
        clicked() {
            debugger;
        }
    }
};
</script>
