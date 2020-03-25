<template>
  <div>
    <v-text-field
      v-model="search"
      append-icon="mdi-account-search"
      class="mb-2"
      label="Поиск"
      single-line
      hide-details
    ></v-text-field>
    <v-data-table
      :headers="headers"
      :items="indexedItems"
      :search="search"
      item-key="id"
      no-data-text="Ничего не найдено"
      no-results-text="Ничего не найдено"
      :items-per-page="studentsTableitemsPerPage"
      :value="value"
      :class="{'clickable': clickable}"
    >
    <slot></slot>
    </v-data-table>
  </div>
</template>

<script>
import StudentAvatar from "@/components/shared/StudentAvatar";
import MarkPicker from "@/components/shared/MarkPicker";

export default {
  data() {
    return {
      studentsTableitemsPerPage: 5,
      search: ""
    };
  },
  components: {
    StudentAvatar,
    MarkPicker
  },
  computed: {
    indexedItems() {
      if (this.items[0].id) {
        return this.items;
      } else {
        return this.items.map((item, index) => ({
          id: index,
          ...item
        }));
      }
    }
  },
  props: {
    headers: Array,
    items: Array,
    value: Array,
    clickable: Boolean
  }
};
</script>

<style lang="scss">
.clickable {
  cursor: pointer;
}
</style>
