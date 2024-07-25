export default defineNuxtRouteMiddleware(async (to, from) => {
  const loggedIn = await useUserStore().isLoggedIn();
  const verified = await useUserStore().isVerified();

  if (!loggedIn && to.path !== "/login") {
    return navigateTo("/login");
  }

  if (to.path === "/login" || to.path === "/logout") {
    return;
  }

  if (!verified && to.path !== "/verify") {
    return navigateTo("/verify");
  }

  if (to.path === "/verify") {
    return;
  }
});
