export const useAppStore = defineStore("appStore", {
  state: () => ({
    availableApps: [] as HLApp[],
    success: false,
    fail: false,
  }),
  actions: {
    async fetchApps() {
      if (this.success) {
        return this.availableApps;
      }
      try {
        const apps = (await $fetch("/api/apps")).body.applications;
        this.availableApps = apps;
        this.success = true;
        this.fail = false;
      } catch (e) {
        console.error(e);
        this.fail = true;
      }
      return this.availableApps;
    },
    hasAccess(route: string) {
      if (this.fail) {
        return false;
      }
      return this.availableApps.some((app) => app.route.startsWith(route));
    },
  },
});
