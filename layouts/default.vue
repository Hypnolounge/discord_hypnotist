<template>
  <v-app>
    <v-app-bar :elevation="2">
      <template v-slot:prepend>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-avatar class="ml-2">
          <v-img
            :src="'https://as2.ftcdn.net/v2/jpg/02/26/19/83/1000_F_226198373_YrHmzO4TCLevDxer1J8GBykvgyoxxv3M.jpg'"
            alt="hl-profile-pic"
          ></v-img>
        </v-avatar>
      </template>
      <v-app-bar-title @click="navigateTo('/')">Hypnolounge</v-app-bar-title>
      <template v-slot:append>
        <v-label class="pr-3">
          {{ name }}
        </v-label>
        <v-avatar color="surface-variant" class="mr-3">
          <v-img v-if="avatar" :src="avatar" alt="user-avatar"></v-img>
          <v-icon v-else>fas fa-user</v-icon>
        </v-avatar>

        <UserMenu />
      </template>
    </v-app-bar>
    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";
const user = useUserStore();

export default defineComponent({
  computed: {
    avatar: () => user.avatar,
    name: () => user.displayname,
  },
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
  mounted() {
    user.fetchMe();
  },
});
</script>
