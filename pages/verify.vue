<script setup lang="ts">
definePageMeta({
  middleware: [
    async function(to, from) {
      if(await useUserStore().isVerified()) {
        return navigateTo("/");
      }
    }
  ]
});
</script>

<template>
    <v-container class="error-message-container" fluid>
      <v-row allign="center" justify="center" >
        <v-col cols="12" md="8" align-self="center">
          <v-alert 
          type="error" 
          prominent
          >
            <div>
              <h2>Error</h2>
              <p>It appears that you are not on the Hypnolounge Discord and or are not verified yet.</p>
              <p>Please make sure you chose your roles on the <a href="https://discord.gg/jPtfUbxrye" target="_blank">Hypnolounge</a>.</p>
            </div>
          </v-alert>
        </v-col>
      </v-row>
    </v-container>
  </template>