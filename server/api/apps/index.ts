export default defineEventHandler((event) => {
    return {
    statusCode: 200,
    body: {
      applications: getApplications(event.context.member),
    },
  };
});
