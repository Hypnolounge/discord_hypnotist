<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <q-page padding>
        <component :is="ccomponent"></component>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { Component, defineComponent } from 'vue';
import { useSessionStore } from 'src/stores/sessionStore';
import LoginButton from 'src/components/LoginButton.vue';
//import LoginError from 'src/components/LoginError.vue';
import LoginLoading from 'src/components/LoginLoading.vue';
import { Cookies } from 'quasar';
const session = useSessionStore()

export default defineComponent({
  data() {
    return {
      ccomponent: LoginButton as Component,
      code: this.$route.query.code,
    };
  },
  beforeMount() {
    if (this.code) {
      this.$data.ccomponent = LoginLoading;
    }
  },
  mounted() {
    if(Cookies.get('hl_id')){
        this.ccomponent = LoginLoading
    }
    if (!this.code) {
    }
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
