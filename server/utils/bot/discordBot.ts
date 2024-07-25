import {
  Client as Bot,
  Events,
  GatewayIntentBits,
  Guild,
  GuildMember,
} from "discord.js";

const bot = new Bot({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildModeration,
  ],
});

bot.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

bot.login(useRuntimeConfig().discordBotToken);

export async function getMember(
  memberID: string,
  guildID = "1125008815272759408"
) {
  const guild = await bot.guilds.fetch(guildID);
  if (!guild) return false;
  try {
    const member = await guild.members.fetch(memberID);
    return member;
  } catch (e) {
    return false;
  }
}

export function isMemberVerified(member: GuildMember) {
  if (!member) return false;
  const memberRoles = useRuntimeConfig().memberRoles;
  for (const role of memberRoles) {
    if (member.roles.cache.has(role)) {
      return true;
    }
  }
  return false;
}

export function isMemberAdmin(member: GuildMember) {
  if (!member) return false;
  return member.permissions.has("Administrator");
}

export function checkMemberInChannel(member: GuildMember) {
  if (!member) return false;
  
}
