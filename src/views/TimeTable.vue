<template>
    <div>
        <Calendar :timeRanges="timeRanges" />
    </div>
</template>

<script>
import Calendar from "../components/Calendar";
export default {
    name: "calendar",
    components: { Calendar },
    data() {
        return {
            timeRanges: [
                {
                    name: "Праздники",
                    start: new Date(2020, 0, 1),
                    end: new Date(2020, 0, 8),
                    color: "#5E345C"
                },
                {
                    name: "Каникулы",
                    start: new Date(2020, 0, 9),
                    end: new Date(2020, 0, 12),
                    color: "#5EC9CC"
                },
                {
                    name: "Производственная практика",
                    start: new Date(2020, 0, 13),
                    end: new Date(2020, 1, 2),
                    color: "#189599"
                },
                {
                    name: "Сессия",
                    start: new Date(2020, 4, 4),
                    end: new Date(2020, 4, 17),
                    color: "#8FFFC3"
                },
                {
                    name: "Преддипломная практика",
                    start: new Date(2020, 4, 18),
                    end: new Date(2020, 4, 31),
                    color: "#FFCFD7"
                },
                {
                    name: "ГИА",
                    start: new Date(2020, 5, 1),
                    end: new Date(2020, 5, 28),
                    color: "#CC5EA8"
                },
                {
                    name: "ГИА",
                    start: new Date(2020, 6, 1),
                    end: new Date(2020, 6, 1),
                    color: "#dddddd"
                }
            ]
        };
    }
};
</script>

<style lang="sccs"></style>
