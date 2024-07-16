import { defineStore } from 'pinia';
import { api } from 'boot/axios'

export const useSessionStore = defineStore('session', {
  state: () => ({
    sess_id: '',
    expiration: Date.now(),
    userInfo: {},
  }),

  getters: {
    isAuthenticated: (state) => state.sess_id.length > 0 && state.expiration > Date.now(),
  },

  actions: {
    async login(code: string) {
      api.get('/session')
      return code;
    },
    checkSession() {
      return this.isAuthenticated;
    },
    logout() {
      this.$reset();
    }
  }
});
