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
                    <v-btn color="primary" small>
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
                    v-model="currentDay"
                >
                    <v-expansion-panel v-for="(item, i) in days" :key="i">
                        <v-expansion-panel-header class="text-uppercase">
                            {{ item.text }}
                        </v-expansion-panel-header>
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
                            <SheduleCard v-for="(item, i) in shedule" :key="i" :lesson="item" />
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
        currentDay: 0,
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
                text: "30.12 Понедельник",
                value: 0
            },
            {
                text: "31.12 Вторник",
                value: 1
            },
            {
                text: "01.12 Среда",
                value: 2
            },
            {
                text: "02.12 Четверг",
                value: 3
            },
            {
                text: "03.12 Пятница",
                value: 4
            }
        ],
        shedule: [
            {
                number: 6,
                time: '17:00 - 18:35',
                title: 'Английский язык',
                type: 'Лекция',
                existingPeriod: '17.09.19 - 18.01.20',
                cabinet: 205,
                corps: 'ГК'
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
