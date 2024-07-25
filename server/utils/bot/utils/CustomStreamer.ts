import { Client } from "discord.js-selfbot-v13";
import { Streamer } from '@dank074/discord-video-stream';


export default class CustomStreamer {
    token: string;
    streamer = new Streamer(new Client());
    queue: any[] = [];
    loopVideo = false;
    useGif = false;


  constructor(token: string) {
    this.token = token;
  }

  async start() {
    
  }

  async stop() {
    
  }
}