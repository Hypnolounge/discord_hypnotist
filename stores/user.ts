declare interface UserResponse {
  statusCode : number;
  body : {
    user: {
      avatar: string;
      displayname: string;
      verified: boolean;
      admin: boolean;
    }
  };
}

export const useUserStore = defineStore("userStore", {
  state: () => ({
    displayname: "Name",
    avatar: "",
    loggedIn: false,
    verified: false,
    admin: false,
  }),
  actions: {
    async fetchMe() {
      if (!this.loggedIn) {
        return;
      }
      if (this.avatar && this.displayname) {
        return { avatar: this.avatar, displayname: this.displayname };
      }
      try {
        const bj = await $fetch<UserResponse>("/api/users/me");
        console.log(bj);
        const user = bj.body.user;
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
        const response = await $fetch("/api/auth/logout");
        console.log(response);
        this.$reset();
        useRouter().push("/login");
      } catch (e) {
        console.error(e);
      }
    },
    async login(code: string) {
      try {
        const response = await $fetch("/api/auth/login", {
          method: "POST",
          body: { code: code },
        });
        console.log(response);
        this.loggedIn = true;
        this.fetchMe();
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
      try {
        const response = await $fetch("/api/users/me");
        console.log(response);
        this.loggedIn = true;
        this.fetchMe();
      } catch (e) {
        console.error(e);
        console.log("User is not logged in");
        this.loggedIn = false;
      }
      console.log("User is logged in:", this.loggedIn);
      return this.loggedIn;
    },
  },
});
