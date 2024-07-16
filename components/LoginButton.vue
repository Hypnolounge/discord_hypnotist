<template>
    <v-btn icon="discord">
        Button
    </v-btn>
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