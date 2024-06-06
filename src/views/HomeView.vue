<script setup lang="ts"></script>

<template>
  <v-app-bar app>
    <v-toolbar-title>Home</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text to="/login">Login</v-btn>
    <v-btn text to="/dashboard">Dashboard</v-btn>
  </v-app-bar>
  <RouterView> </RouterView>
</template>
