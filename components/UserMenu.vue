<template>
  <v-menu activator="parent">
    <v-list>
      <v-list-item
        v-for="(item, index) in items"
        :key="index"
        :value="index"
        @click="item.click"
      >
        <template v-slot:prepend>
          <v-icon>{{ item.icon }}</v-icon>
        </template>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      items: [
        {
          title: "Profile",
          icon: "fas fa-user",
          click: () => navigateTo("/profile"),
        },
        {
          title: "Settings",
          icon: "fas fa-gear",
          click: () => navigateTo("/settings"),
        },
        {
          title: "Logout",
          icon: "fas fa-right-from-bracket",
          click: () => navigateTo("/logout"),
        },
      ],
    };
  },
});
</script>