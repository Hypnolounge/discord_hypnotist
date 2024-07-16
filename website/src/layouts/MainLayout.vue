<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          Hypnolounge
        </q-toolbar-title>
        <q-btn flat dense icon="logout" @click="logout"/>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          Hypnolounge
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template> 

<script lang="ts">
import { useSessionStore } from 'src/stores/sessionStore';
const store = useSessionStore();

export default {
  methods: {
    logout() {
      console.log('logout');
      store.logout();
      this.$router.push('/login');
    }
  }
};
</script>