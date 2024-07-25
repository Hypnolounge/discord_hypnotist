export default defineNuxtRouteMiddleware(async (to, from) => {
  if (!to.path.startsWith("/apps")) {
    return;
  }
  if (to.path === "/apps") {
    return;
  }
  if (to.path === "/apps/no-access") {
    return;
  }
  

  const apps = useAppStore();
  await apps.fetchApps();

  if (!apps.hasAccess(to.path)) {
    return navigateTo("/apps/no-access");
  }
});
