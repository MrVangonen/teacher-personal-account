<template>
    <div class="card" @click="goToCurrentLesson()">
        <div class="card__row">
            <span class="card__row-caption">
                п/н:
            </span>
            <div>
                {{ lesson.number }}
            </div>
        </div>
        <div class="card__row">
            <span class="card__row-caption">
                Время:
            </span>
            <div class="d-flex flex-column">
                <span>{{ lesson.startTime }}</span>
                <span>{{ lesson.endTime }}</span>
            </div>
        </div>
        <div class="card__row">
            <span class="card__row-caption">
                Предмет:
            </span>
            <b>
                {{ lesson.title }}
            </b>
            <span
                class="card__row-existing-period cyan--text d-none d-sm-block body-2"
            >
                {{ lesson.existingPeriod }}
            </span>
        </div>
        <div class="card__row">
            <span class="card__row-caption">
                Вид занятия:
            </span>
            <span>
                {{ lesson.type }}
            </span>
        </div>
        <div class="card__row">
            <span class="card__row-caption">
                Кабинет:
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
            id: Number,
            disciplineId: Number,
            number: Number,
            time: Date,
            title: String,
            type: String,
            existingPeriod: String,
            cabinet: String,
            corps: String
        }
    },
    methods: {
        goToCurrentLesson() {
            this.$router.push({
                path: `/${this.lesson.id}`
            });
        }
    }
};
</script>

<style lang="scss">
.card {
    display: flex;
    flex-direction: column;
    min-height: 100px;
    padding: 0 20px;
    margin-bottom: 5px;
    cursor: pointer;
    border-radius: 2px;
    background-color: white;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
        0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);

    &:hover {
        background-color: var(--v-accent-lighten4);
    }

    &__row {
        display: flex;
        align-items: center;
        width: 100%;

        &:nth-of-type(1) {
            flex-shrink: 2;
        }

        &-caption {
            min-width: 40%;
            padding-left: 10%;
            font-size: 0.875rem;
            font-weight: 400;
        }

        &-existing-period {
            white-space: nowrap;
        }
    }
}

@media (min-width: 600px) {
    .card {
        flex-direction: row;
        padding-top: 24px;

        &__row {
            display: inline-block;
            text-align: center;

            &-caption {
                display: none;
            }
        }
    }
}
</style>
