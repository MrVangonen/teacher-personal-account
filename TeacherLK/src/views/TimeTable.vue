<template>
    <div>
        <h1 class="text-center">Учебный календарь на {{ currentYear }} год</h1>
        <Calendar v-once :timeRanges="timeRanges" :currentYear="currentYear"/>
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
                    color: "#FFDCF2"
                },
                {
                    name: "Каникулы",
                    start: new Date(2020, 0, 9),
                    end: new Date(2020, 0, 12),
                    color: "#E3FFD7"
                },
                {
                    name: "Производственная практика",
                    start: new Date(2020, 0, 13),
                    end: new Date(2020, 1, 2),
                    color: "#DEC2FF"
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
                    color: "#dddddd"
                }
            ]
        };
    },
    computed: {
        currentYear() {
            return new Date().getFullYear();
        }
    }
};
</script>

<style lang="sccs"></style>
