import { GuildMember } from "discord.js";

interface HLApp {
    id: string;
    name: string;
    description: string;
    image: string;
    route: string;
    permissions: string[];
}

const registeredApps: HLApp[] = [
    {
        id: "hypnotist",
        name: "Hypnotist",
        description: "The new way to hypnotize yourself",
        image: "https://hypnolounge.com/assets/hypnotist.png",
        route: "/hypnotist",
        permissions: ["verified"],
    },
]

export function hasMemberAccess(member:GuildMember, appID:string) {

    if(isMemberAdmin(member)) return true;

    const app = registeredApps.find(app => app.id === appID);
    if(!app) return false;

    if(app.permissions.includes("everyone")) {
        return true;
    }

    if(app.permissions.includes("verified")) {
        return isMemberVerified(member);
    }

    return false;
}

export function getApplications(member:GuildMember) {
    if(!member) return [];
    
    if(isMemberAdmin(member)) {
        return registeredApps;
    }

    if(isMemberVerified(member)) {
        return registeredApps.filter(app => app.permissions.includes("verified"));
    }

    return [];
}