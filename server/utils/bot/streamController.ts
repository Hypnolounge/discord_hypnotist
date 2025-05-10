import { Client } from "discord.js-selfbot-v13";
import { Streamer } from "@dank074/discord-video-stream";
import config from "./bot_conf.json";

const token = config.BotCredentials;
interface ActionData {
  action: string;
  data: any;
}

export function receiveAction(actionData: string, session_token: string) {
  const action = JSON.parse(actionData) as ActionData;
  switch (action.action) {
    case "requestInformation":
      
    default:
      console.log("Unknown action: ", action);
  }
}
