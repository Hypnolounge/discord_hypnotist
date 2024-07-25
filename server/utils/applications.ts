import { GuildMember } from "discord.js";

const registeredApps: HLApp[] = [
    {
        id: "hypnotist",
        name: "Hypnotist",
        description: "The new way to hypnotize yourself",
        image: "https://t3.ftcdn.net/jpg/00/38/44/04/360_F_38440431_8m7O1ZA0KUF38wmqEFEG4I8U0fujP7MN.jpg",
        route: "/apps/hypnotist",
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