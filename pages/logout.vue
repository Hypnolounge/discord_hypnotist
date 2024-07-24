<script setup lang="ts">
definePageMeta({
  middleware: [
    async function(to, from) {
      if(!(await useUserStore().isLoggedIn())) {
        return navigateTo("/login");
      }
    }
  ]
});
</script>

<template>
  <v-container
    class="d-flex flex-column align-center justify-center"
    style="height: 100vh"
  >
    <v-progress-linear color="cyan" indeterminate></v-progress-linear>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  async mounted() {
    await useUserStore().logout();
  },
});
</script>
