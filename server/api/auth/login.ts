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
  var output: TokenResponse;
  try {
    output = await $fetch(`${runtimeConfig.discordApiUrl}/oauth2/token`, {
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
    });
  } catch (e) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid token",
    });
  }

  if (!output) {
    throw createError({
      statusCode: 400,
      statusMessage: "No data received from Discord API",
    });
  }

  const id = await loginUser(output.access_token);
  if (!id) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to add user to database",
    });
  }

  setCookie(event, useRuntimeConfig().cookieName, id, {
    httpOnly: true,
  });

  return {
    statusCode: 200,
    body: {
      message: "Successfully logged in",
    },
  };
});
