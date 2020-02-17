<template>
    <div>
        <div class="my-2">
            <div v-if="localMarks.length">
                <v-icon
                    v-for="(mark, index) in localMarks"
                    :key="index"
                    :color="mark.color"
                    >{{ mark.icon }}</v-icon
                >
            </div>
            <div v-else>
                Нет оценок
            </div>
        </div>
        <v-menu left offset-x>
            <template v-slot:activator="{ on }">
                <v-btn fab dark class="mb-2" x-small v-on="on">
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
            </template>
            <v-list>
                <v-list-item-group v-model="localMarks" multiple>
                    <v-list-item
                        v-for="(mark, index) in markEnum"
                        :key="index"
                        :value="mark"
                        @click="onClick(); $emit('change-marks-array', mark);"
                    >
                        <v-list-item-title>
                            {{ mark.text }}
                        </v-list-item-title>
                        <v-icon :color="mark.color">{{ mark.icon }}</v-icon>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-menu>
    </div>
</template>

<script>
import markEnum from "@/assets/js/enums/markEnum.js";

export default {
    data() {
        return {
            markEnum: Object.values(markEnum)
        };
    },
    props: {
        onClick: Function,
        marks: Array
    },
    computed: {
        localMarks: {
            get() {
                return this.marks;
            },
            set(value) {
                return value;
            }
        }
    }
};
</script>

<style></style>
