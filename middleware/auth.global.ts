export default defineNuxtRouteMiddleware(async (to, from) => {
  // isAuthenticated() is an example method verifying if a user is authenticated
  console.log("Checking if user is logged in");
  const loggedIn = await useUserStore().isLoggedIn();
  const verified = useUserStore().verified;

  if (!loggedIn && to.path !== "/login") {
    console.log("User is not logged in, redirecting to /login");
    return navigateTo("/login");
  }

  if (loggedIn && to.path === "/login") {
    console.log("User is logged in, redirecting to /");
    return navigateTo("/");
  }

  if (!loggedIn && to.path === "/login") {
    return;
  }

  if(verified && to.path === "/verify") {
    return navigateTo("/");
  }
  
  if(!verified && to.path === "/logout") {
    return ;
  }

  if(!verified && to.path !== "/verify") {
    return navigateTo("/verify");
  }

  console.log("User is logged in, continuing");
});
