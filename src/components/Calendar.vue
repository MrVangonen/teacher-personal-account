<template>
    <div>
        <h1 class="text-center">Учебный календарь на {{ currentYaer }} год</h1>
        <div class="calendar">
            <CalendarMonth
                v-for="(month, index) in monthsArray"
                :key="index"
                :month="month"
            />
        </div>
    </div>
</template>

<script>
import CalendarMonth from "../components/CalendarMonth";

export default {
    name: "",
    components: {
        CalendarMonth
    },
    data() {
        return {
            parsedTimeRanges: new Map()
        };
    },
    props: {
        timeRanges: Array
    },
    computed: {
        currentYaer() {
            return new Date().getFullYear();
        },
        monthsArray() {
            let result = [];
            for (let i = 0; i < 12; i++) {
                let name = new Date(this.currentYaer, i).toLocaleString("rus", {
                    month: "long"
                });

                result.push({
                    name
                });
            }
            return result;
        }
    },
    created() {
        this.initParsedTimeRanges();
        this.parseTimeRanges();
        this.sortParsedTimeRanges();

        this.monthsArray.forEach((month, monthIndex) => {
            this.initMonthDaysArray(month, monthIndex);

            let colorDaysArray = this.parsedTimeRanges.get(monthIndex);
            this.setDaysArrayToMonth(month, monthIndex, colorDaysArray);
        });
    },
    methods: {
        initParsedTimeRanges() {
            for (let month = 0; month < 12; month++) {
                this.parsedTimeRanges.set(month, []);
            }
        },
        parseTimeRanges() {
            this.timeRanges.forEach(range => {
                let startMonth = range.start.getMonth();
                let daysBetweenStartEnd = this.getDaysBetweenTwoDates(
                    range.start,
                    range.end
                );

                let colorDaysArray = this.parsedTimeRanges.get(startMonth);
                colorDaysArray.push({
                    number: range.start.getDate(),
                    daysCount: daysBetweenStartEnd,
                    color: range.color,
                    name: range.name
                });
            });
        },
        sortParsedTimeRanges() {
            for (colorDaysArray in this.parsedTimeRanges.values()) {
                colorDaysArray.sort((a, b) => a.number - b.number);
            }
        },
        initMonthDaysArray(month, monthIndex) {
            let startDayOfWeek = this.getStartDayOfWeekInMonth(monthIndex);

            month.days = new Array(startDayOfWeek).fill(null);
        },
        setDaysArrayToMonth(month, monthIndex, colorDaysArray = []) {
            let currentMonthDaysCount = this.getDaysCountOfMonth(monthIndex);

            this.fillMonthDaysArray(month, 1, currentMonthDaysCount - 1);

            colorDaysArray.forEach(colorDay => {
                let currentMonthAvailableDaysCount =
                    currentMonthDaysCount - colorDay.number;
                if (colorDay.daysCount <= currentMonthAvailableDaysCount) {
                    this.fillMonthDaysArray(
                        month,
                        colorDay.number,
                        colorDay.daysCount,
                        colorDay
                    );
                } else {
                    let nextMonthDaysArray = this.parsedTimeRanges.get(
                        monthIndex + 1
                    );

                    nextMonthDaysArray.unshift({
                        number: 1,
                        daysCount:
                            colorDay.daysCount - currentMonthAvailableDaysCount - 1,
                        color: colorDay.color,
                        name: colorDay.name
                    });
                    this.fillMonthDaysArray(
                        month,
                        colorDay.number,
                        currentMonthAvailableDaysCount,
                        colorDay
                    );
                }
            });
        },
        fillMonthDaysArray(month, startDay, daysCount, attributes = {}) {
            for (let number = 0; number <= daysCount; number++) {
                month.days[startDay + number] = {
                    number: startDay + number,
                    color: attributes.color,
                    name: attributes.name
                };
            }
        },
        getStartDayOfWeekInMonth(monthIndex) {
            let startDate = new Date(this.currentYaer, monthIndex, 1);
            let startDayOfWeek = startDate.getDay();
            startDayOfWeek = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;

            return startDayOfWeek;
        },
        getDaysBetweenTwoDates(startDate, endDate) {
            let time = endDate.getTime() - startDate.getTime();
            return time / (1000 * 3600 * 24);
        },
        getDaysCountOfMonth(month) {
            return new Date(this.currentYaer, month + 1, 0).getDate();
        }
    }
};
</script>

<style lang="scss">
$circle-side: 2rem;

.legend {
    .legend-item {
        .legend-circle {
            width: $circle-side;
            height: $circle-side;
            border-radius: 50%;
            background: red;
        }
    }
}

.calendar {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    cursor: default;
}
</style>
