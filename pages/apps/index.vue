<template>
  <v-container fluid>
    <v-row>
      <v-col cols="auto">
        <v-skeleton-loader
          class="mx-auto border"
          width="300"
          type="image, article"
          v-if="!success && !fail"
        ></v-skeleton-loader>
        <v-alert v-if="fail" type="error" outlined class="mx-auto"
          >An error occured</v-alert
        >
        <v-alert
          v-if="success && apps.length === 0"
          type="error"
          outlined
          class="mx-auto"
          >No apps found</v-alert
        >
        <app-component v-for="app in apps" :app="app"></app-component>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
export default defineComponent({
  name: "Apps",
  data() {
    return {
      apps: [] as HLApp[],
    };
  },
  computed: {
    fail() {
      return useAppStore().fail;
    },
    success() {
      return useAppStore().success;
    },
  },
  async mounted() {
    this.apps = await useAppStore().fetchApps();
  },
});
</script>
