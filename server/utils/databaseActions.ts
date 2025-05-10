import { User } from "discord.js";

const db = useDatabase();

// Create a table for users if it doesn't exist
db.sql`CREATE TABLE IF NOT EXISTS users ("session" TEXT PRIMARY KEY, "id" TEXT, "token" TEXT, "displayname" TEXT, "avatar" TEXT)`;

export async function loginUser(token: string) {
  const runtimeConfig = useRuntimeConfig();
  const response: User = await $fetch(
    `${runtimeConfig.discordApiUrl}/users/@me`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  response.avatar = `https://cdn.discordapp.com/avatars/${response.id}/${response.avatar}.png`;
  try {
    const result = await db.sql`INSERT INTO users (session, id, token, displayname, avatar) VALUES (${response.id}, ${response.id}, ${token}, ${response.globalName||response.username}, ${response.avatar})`;
  }
  catch (e) {
    console.error(e);
    //return false;
    return response.id;
  }
  return response.id;
}

export async function logoutUser(id: string) {
  const result = await db.sql`DELETE FROM users WHERE session = ${id}`;
  if (result.changes === 0) return false;
  return true;
}

export async function getUser(id:string): Promise<any | null> {
  const user = await db.sql`SELECT * FROM users WHERE session = ${id}`;
  if (!user.rows) return false;
  if (user.rows.length === 0) return false;
  return user.rows[0];
}