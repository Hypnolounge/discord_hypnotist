<script setup lang="ts">
definePageMeta({
  layout: "auth",
  middleware: [
    async function(to, from) {
      if(await useUserStore().isLoggedIn()) {
        return navigateTo("/");
      }
    }
  ]
});
</script>

<template>
  <v-progress-linear
    color="cyan"
    indeterminate
    v-if="loading"
  ></v-progress-linear>

  <v-container
    class="d-flex flex-column align-center justify-center"
    style="height: 100vh"
    v-else
  >
    <v-container
      v-if="code && !success"
      class="d-flex flex-column align-center justify-center"
    >
      <v-icon size="128" color="red"> fas fa-exclamation-circle </v-icon>
      <h1 class="mt-4">Sorry, please try again</h1>
    </v-container>
    <v-container class="d-flex flex-column align-center">
      <v-btn size="x-large" prepend-icon="fa-brands fa-discord" :href="link">
        Login
      </v-btn>
    </v-container>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
const config = useRuntimeConfig();

export default defineComponent({
  // type inference enabled
  data() {
    return {
      link: config.public.discordRedirectUri,
      loading: false,
      success: false,
      code: this.$route.query.code as string,
    };
  },
  methods: {
  },
  async mounted() {
    if (!this.code) return;
    this.loading = true;
    console.log("logging in " + this.code);
    this.success = await useUserStore().login(this.code);
    this.loading = false;
  },
});
</script>
