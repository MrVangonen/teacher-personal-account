<template>
  <div class="text-center">
    <div class="marks-container my-2">
      <div class="marks" v-if="localMarks.length">
        <div v-if="!readOnly">
          <v-hover v-for="(mark, index) in localMarks" :key="index" v-slot:default="{ hover }">
            <v-btn :color="getMarkObject(mark).color" @click="deleteMark(index)" icon>
              <v-icon v-show="!hover">{{ getMarkObject(mark).icon }}</v-icon>
              <v-icon v-show="hover">mdi-close</v-icon>
            </v-btn>
          </v-hover>
        </div>
        <div v-else>
          <v-btn
            v-for="(mark, index) in localMarks"
            :key="index"
            :color="getMarkObject(mark).color"
            icon
          >
            <v-icon>{{ getMarkObject(mark).icon }}</v-icon>
          </v-btn>
        </div>
      </div>
      <div class="marks" v-else>Нет оценок</div>
    </div>
    <v-menu left offset-x v-if="!readOnly">
      <template v-slot:activator="{ on }">
        <v-btn fab class="mb-2" x-small v-on="on" :disabled="disabled" :dark="!disabled">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item-group v-model="localMarks">
          <v-list-item
            v-for="(mark, index) in markEnum"
            :key="index"
            :value="mark.value"
            @click="onClick()"
          >
            <v-list-item-title>{{ mark.text }}</v-list-item-title>
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
    marks: Array,
    disabled: Boolean,
    readOnly: Boolean
  },
  computed: {
    localMarks: {
      get() {
        return this.marks;
      },
      set(value) {
        this.marks.push(value);
        return this.marks;
      }
    }
  },
  methods: {
    deleteMark(index) {
      this.localMarks.splice(index, 1);
    },
    getMarkObject(value) {
      return this.markEnum.find(mark => {
        return mark.value === value;
      });
    }
  }
};
</script>

<style>
.marks-container {
  min-height: 72px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
}

.marks-container .marks {
  width: 100px;
}
</style>
