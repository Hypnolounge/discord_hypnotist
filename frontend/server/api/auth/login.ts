interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig();
  const body = await readBody(event);
  if (!body.code) {
    throw createError({
      statusCode: 400,
      statusMessage: "No token specified",
    });
  }
  const code = body.code;

  const output:TokenResponse = await $fetch(runtimeConfig.discordApiUrl, {
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code: code.toString(),
      redirect_uri: runtimeConfig.disocrdApiRedirectUri,
      client_id: runtimeConfig.discordApiId,
      client_secret: runtimeConfig.discordApiSecret,
    }),
    
  },);

  console.log(output);
  if (!output) {
    throw createError({
      statusCode: 400,
      statusMessage: "No data received from Discord API",
    });
  }
  return {
    token: output.access_token,
  };
});
