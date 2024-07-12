<script setup lang="ts">
definePageMeta({
  layout: "auth",
});
</script>

<template>
  <v-progress-linear
    color="cyan"
    indeterminate
    v-if="code&&!failed"
  ></v-progress-linear>

  <v-container
    class="d-flex flex-column align-center justify-center"
    style="height: 100vh"
    v-else
  >
    <v-container
      v-if="failed"
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
const config = useRuntimeConfig()

export default defineComponent({
  // type inference enabled
  data() {
    return {
      link: config.public.discordRedirectUri,
      failed: false,
      code: this.$route.query.code,
    };
  },
  methods: {
    async login() {
      try {
        const { data } = await useFetch('/api/auth/login', {
          method: 'POST',
          body: { code: this.code },
        });
        if (data.value) {
          this.$router.push('/');
        } else {
          this.failed = true;
        }
      } catch (error) {
        this.failed = true;
      }
    },
  },
  mounted() {
    if (this.code) {
      console.log('logging in ' + this.code );  
      this.login();
    }
  },
});
</script>
