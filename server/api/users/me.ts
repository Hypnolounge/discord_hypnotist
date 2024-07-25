export default defineEventHandler(async (event) => {
  const userData = {
    avatar: event.context.sessionUser.avatar as string,
    displayname: event.context.sessionUser.displayname as string,
    verified: isMemberVerified(event.context.member),
    admin: isMemberAdmin(event.context.member),
  }

  return {
    statusCode: 200,
    body: {
      user: userData,
    },
  };
});
