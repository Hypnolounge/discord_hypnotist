<script setup lang="ts">
definePageMeta({
  middleware: [
    async function (to, from) {
      if (await useUserStore().isVerified()) {
        //return navigateTo("/");
      }
    },
  ],
});
</script>

<template>
  <v-container class="error-message-container" fluid>
    <v-row justify="center">
      <v-col align-self="center" cols="4">
        <v-alert type="error" prominent title="Error">
          It appears that you are not on the Hypnolounge Discord and or are not
          verified yet.
          <br />
          Please make sure you choose your roles on the Hypnolounge.
        </v-alert>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col align-self="center" cols="4">
        <v-alert type="info" prominent title="Info">
          You can join the Hypnolounge Discord by clicking the button below.
          <v-divider
            class="mb-3 mt-2"
            color="white"
            opacity="0.5"
            :thickness="2"
          ></v-divider>
          <v-btn
            prepend-icon="fa-brands fa-discord"
            href="https://discord.gg/jPtfUbxrye"
            target="_blank"
            rel="noopener noreferrer"
          >
            Hypnolounge
          </v-btn>
        </v-alert>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col align-self="center" cols="auto"> </v-col>
    </v-row>
  </v-container>
</template>
