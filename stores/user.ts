export const useUserStore = defineStore("userStore", {
  state: () => ({
    displayname: "Name",
    avatar: "",
    loggedIn: false,
    verified: false,
    admin: false,
    noSession: false,
  }),
  actions: {
    async fetchMe() {
      if (!this.loggedIn) {
        return;
      }
      if (this.avatar) {
        return { avatar: this.avatar, displayname: this.displayname };
      }
      try {
        const user = (await $fetch("/api/users/me")).body.user;
        this.avatar = user.avatar;
        this.displayname = user.displayname;
        this.verified = user.verified;
        this.admin = user.admin;
      } catch (e) {
        console.error(e);
      }
    },
    async logout() {
      try {
        await $fetch("/api/auth/logout");
      } catch (e) {
        console.error(e);
      }
      this.$reset();
      useRouter().push("/login");
    },
    async login(code: string) {
      try {
        await $fetch("/api/auth/login", {
          method: "POST",
          body: { code: code },
        });
        this.loggedIn = true;
        this.noSession = false;
        await this.fetchMe();
        useRouter().push("/");
        return true;
      } catch (e) {
        console.error(e);
        return false;
      }
    },
    async isLoggedIn() {
      if (this.loggedIn) {
        return true;
      }
      if (this.noSession) {
        return false;
      }
      try {
        await $fetch("/api/auth/session");
        this.loggedIn = true;
        await this.fetchMe();
      } catch (e) {
        //console.error(e);
        console.log("Not logged in");
        this.noSession = true;
      }
      return this.loggedIn;
    },
    async isVerified() {
      if (this.verified) {
        return true;
      }
      try {
        await this.isLoggedIn();
      } catch (e) {
        //console.error(e);
      }
      return this.verified;
    },
  },
});
