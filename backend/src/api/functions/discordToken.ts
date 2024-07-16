import axios from "axios";

export default async function getUserToken(code: string) {
  if (!code) {
    throw {error:"No code provided"}
  }

  const formData = {
    grant_type: "authorization_code",
    code: code.toString(),
    redirect_uri: process.env.API_REDIRECT_URI,
    scope: "identify",
  };

  const output = await axios.post(
    "https://discord.com/api/v10/oauth2/token",
    formData,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      auth: {
        username: process.env.API_CLIENT_ID ?? "",
        password: process.env.API_CLIENT_SECRET ?? "",
      },
      data: formData,
    }
  );

  if (!output.data) {
    throw {error: "No data received from Discord"}
  }

  return output.data.access_token;
}