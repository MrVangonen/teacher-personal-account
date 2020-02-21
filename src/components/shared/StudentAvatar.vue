<template>
    <div>
        <v-avatar size="32" color="primary" class="mr-2">
            <img v-if="studentAvatar" :src="studentAvatar" />
            <span class="white--text" v-else>{{ studentName[0] }} </span>
        </v-avatar>
        <span class="font-weight-bold">
            {{ studentName }}
        </span>
    </div>
</template>

<script>
export default {
  props: {
    studentName: String,
    studentAvatar: String
  }
};
</script>

<style></style>
