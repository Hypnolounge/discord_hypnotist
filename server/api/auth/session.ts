export default defineEventHandler((event) => {
  if (event.context.sessionUser) {
    return {
      body:{}
    };
  }
  throw createError({
    statusCode: 461,
    statusMessage: "No Session",
  });
});
