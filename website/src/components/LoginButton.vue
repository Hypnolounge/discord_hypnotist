<template>
  <q-btn
    icon="discord"
    color="primary"
    text-color="white"
    label="Login with Discord"
    :href="link"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  // type inference enabled
  data() {
    return {
      link: process.env.DISCORD_REDIRECT_URI,
    };
  },
});
</script>

<style scoped>
.q-page {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
