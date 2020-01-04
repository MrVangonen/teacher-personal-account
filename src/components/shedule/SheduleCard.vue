<template>
    <div class="card">
        <div class="my-row">
            <span>
                п/н
            </span>
            <span>
                Время
            </span>
            <span>
                Предмет
            </span>
            <span>
                Вид занятия
            </span>
            <span>
                Кабинет
            </span>
        </div>
        <div class="my-row ">
            <span>
                {{ lesson.number }}
            </span>
            <span>
                {{ lesson.time }}
            </span>
            <span>
                {{ lesson.title }}
            </span>
            <span>
                {{ lesson.type }}
            </span>
            <span> {{ lesson.cabinet }} {{ lesson.corps }} </span>
        </div>
    </div>
</template>

<script>
export default {
    name: "sheduleCard",
    props: {
        lesson: {
            number: Number,
            time: Date,
            title: String,
            type: String,
            existingPeriod: String,
            cabinet: Number,
            corps: String
        }
    }
};
</script>

<style lang="scss">
.crad {
    display: flex;
    flex-direction: row;
}
@media (min-width: 600px) {
    .crad {
        flex-direction: column;
    }

    .my-row {
        & > :first-child {
            width: calc(100vw / 5);
        }
        & > :not(:first-child) {
            width: calc(100vw / 5);
        }
    }
}
.my-row {
    display: flex;
    flex-wrap: nowrap;
    overflow: hidden;
}
</style>
