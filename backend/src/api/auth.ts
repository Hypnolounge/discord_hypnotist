import getUserToken from "./functions/discordToken";

export default async function auth(req: any, res: any) {
  const code = req.query.code;
  var token = ""
  try {
    const token = await getUserToken(code);
  } catch (error) {
    return res.status(400).json({error: error});
  }
  res.send("Auth is working! Token: " + token);
}
