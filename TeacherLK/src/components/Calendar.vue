<template>
    <div class="calendar">
        <CalendarMonth
            v-for="(month, index) in monthsArray"
            :key="index"
            :month="month"
        />
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
        timeRanges: Array,
        currentYear: Number
    },
    computed: {
        monthsArray() {
            let result = [];
            for (let i = 0; i < 12; i++) {
                let name = new Date(this.currentYear, i).toLocaleString("rus", {
                    month: "long"
                });

                result.push({
                    name,
                    days: []
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
            month.startDayOfWeek = this.getStartDayOfWeekInTheMonth(monthIndex);

            let colorDaysArray = this.parsedTimeRanges.get(monthIndex);
            this.setDaysArrayToTheMonth(month, monthIndex, colorDaysArray);
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
        setDaysArrayToTheMonth(month, monthIndex, colorDaysArray = []) {
            let currentMonthDaysCount = this.getDaysCountOfTheMonth(monthIndex);

            this.initMonthDaysArray(month, currentMonthDaysCount);

            colorDaysArray.forEach(colorDay => {
                let currentMonthAvailableDaysCount =
                    currentMonthDaysCount - colorDay.number;
                if (colorDay.daysCount <= currentMonthAvailableDaysCount) {
                    this.upgradeMonthDaysArray(
                        month,
                        colorDay.number,
                        colorDay.daysCount,
                        colorDay
                    );
                } else {
                    this.setNotFitDaysToTheNextMonth(
                        monthIndex,
                        currentMonthAvailableDaysCount,
                        colorDay
                    );

                    this.upgradeMonthDaysArray(
                        month,
                        colorDay.number,
                        currentMonthAvailableDaysCount,
                        colorDay
                    );
                }
            });
        },
        setNotFitDaysToTheNextMonth(
            monthIndex,
            currentMonthAvailableDaysCount,
            colorDay
        ) {
            let nextMonthDaysArray = this.parsedTimeRanges.get(monthIndex + 1);

            nextMonthDaysArray.unshift({
                number: 1,
                daysCount:
                    colorDay.daysCount - currentMonthAvailableDaysCount - 1,
                color: colorDay.color,
                name: colorDay.name
            });
        },
        initMonthDaysArray(month, daysCount) {
            for (let number = 1; number <= daysCount; number++) {
                month.days.push({
                    number,
                    color: null,
                    name: null
                });
            }
        },
        upgradeMonthDaysArray(month, startDay, daysCount, attributes = {}) {
            for (let number = 0; number <= daysCount; number++) {
                month.days[startDay + number - 1].color = attributes.color;
                month.days[startDay + number - 1].name = attributes.name;
            }
        },
        getStartDayOfWeekInTheMonth(monthIndex) {
            let startDate = new Date(this.currentYear, monthIndex, 1);
            let startDayOfWeek = startDate.getDay();
            startDayOfWeek = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;

            return startDayOfWeek;
        },
        getDaysBetweenTwoDates(startDate, endDate) {
            let time = endDate.getTime() - startDate.getTime();
            return time / (1000 * 3600 * 24);
        },
        getDaysCountOfTheMonth(month) {
            return new Date(this.currentYear, month + 1, 0).getDate();
        }
    }
};
</script>

<style lang="scss">
.calendar {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    cursor: default;
}
</style>
