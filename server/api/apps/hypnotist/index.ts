export default defineEventHandler((event) => {
  throw createError({
    statusCode: 404,
    statusMessage: "Not found",
  });
});
