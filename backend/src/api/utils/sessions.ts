import getUserIdentity from "../functions/discordIndentify"

const sessions = {}

function createSessionID() {
    return sessions
}

async function createSession(token:string) {
    const user = await getUserIdentity(token)
    sessions
}

export async function checkSession(session:string) {

}