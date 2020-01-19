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
                <v-tooltip v-for="(day, index) in month.days" :key="index" :disabled="!day" left>
                    <template v-slot:activator="{ on }">
                        <span
                            v-on="on"
                            class="day"
                            :class="{ 'day-number': day }"
                            :style="{ 'background-color': day && day.color }"
                        >
                            {{ day && day.number }}
                        </span>
                    </template>
                    <span>{{ (day && day.name) || (day && defaultDayTooltip) }}</span>
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
                        background-color: var(--v-primary-lighten2);
                        border: 1px solid grey;
                        opacity: 0.8;
                    }
                }

                &:nth-child(7n) {
                    color: #e57373;
                }
            }
        }
    }
}
</style>
