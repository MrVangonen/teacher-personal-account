<template>
    <div class="month">
        <h4 class="month-name">
            {{ month.name }}
        </h4>
        <div class="month-content">
            <div class="days-of-the-week mb-2">
                <b
                    class="day"
                    v-for="(weekDay, index) in daysOfTheWeek"
                    :key="index"
                >
                    {{ weekDay }}
                </b>
            </div>
            <div class="week">
                <div
                    class="day"
                    v-for="i in month.startDayOfWeek"
                    :key="-i"
                >
                    {{ void 0 }}
                </div>
                <v-tooltip
                    v-for="(day, index) in month.days"
                    :key="index"
                    left
                >
                    <template v-slot:activator="{ on }">
                        <div
                            v-on="on"
                            class="day day-number"
                            :style="{ 'background-color': day.color }"
                        >
                            {{ day.number }}
                        </div>
                    </template>
                    <span>{{ day.name || defaultDayTooltip }}</span>
                </v-tooltip>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            daysOfTheWeek: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
            defaultDayTooltip: "Учебный семестр"
        };
    },
    props: {
        month: Object
    }
};
</script>

<style lang="scss">
.month {
    height: 250px;
    width: 350px;
    background: #fff;
    margin: 15px;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
        0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);

    .month-name {
        padding: 10px 0;
        background-color: var(--v-accent-lighten1);
        color: white;
        text-align: center;
    }

    .month-content {
        padding: 20px 20px 0 20px;

        .week,
        .days-of-the-week {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            text-align: center;

            .day {
                width: calc(100% / 7);
                height: 25px;

                &-number {
                    &:hover {
                        border: 1px solid var(--v-primary-lighten2);
                        opacity: 0.9;
                    }
                }

                &:nth-of-type(7n) {
                    color: #e57373;
                }
            }
        }
    }
}
</style>
