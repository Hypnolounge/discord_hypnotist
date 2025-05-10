export default defineEventHandler(async (event) => {
  if (!event.path.startsWith("/api")) {
    return;
  }

  const cookie = getCookie(event, useRuntimeConfig().cookieName) || "";

  const user = await getUser(cookie);
  event.context.sessionUser = user;

  if (event.path.startsWith("/api/auth")) {
    return;
  }

  const member = await getMember(user.id);
  event.context.member = member;
  
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }

  if (!member && !event.path.startsWith("/api/users")) {
    throw createError({
      statusCode: 423,
      statusMessage: "Not a member of the Hypnolounge",
    });
  }
});
