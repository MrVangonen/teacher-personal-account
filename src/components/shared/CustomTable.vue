<template>
  <v-data-table
    item-key="studentName"
    no-data-text="Ничего не найдено"
    no-results-text="Ничего не найдено"
    :items-per-page="studentsTableitemsPerPage"
  >
    <slot></slot>
  </v-data-table>
</template>

<script>
export default {
  data() {
    studentsTableitemsPerPage: 5
  }
};
</script>

<style lang="scss">
.v-data-table__wrapper tbody tr {
  // Кликабельная vuetify дата-table, с ховером
  cursor: pointer;
  height: 100px;

  &:hover {
    background-color: var(--v-lightning-base) !important;
  }
}
</style>
