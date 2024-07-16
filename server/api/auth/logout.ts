export default defineEventHandler(async (event) => {
  const cookie = getCookie(event, "auth") || "";

  const user = await logoutUser(cookie);

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }

  setCookie(event, "auth", "", {
    httpOnly: true,
  });
  return {
    statusCode: 200,
    body: {
      user,
    },
  };
});
