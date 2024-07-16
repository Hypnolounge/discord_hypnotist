export default defineEventHandler(async (event) => {
  if (!event.path.startsWith("/api")) {
    return;
  }
  if (event.path.startsWith("/api/auth")) {
    return;
  }

  const cookie = getCookie(event, "auth") || "";

  const user = await getUser(cookie);

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }

  const member = await getMember(user.id);

  event.context.member = member;
  event.context.sessionUser = user;


  if (!member && !event.path.startsWith("/api/users")) {
    throw createError({
      statusCode: 423,
      statusMessage: "Not a member of the Hypnolounge",
    });
  }
});
