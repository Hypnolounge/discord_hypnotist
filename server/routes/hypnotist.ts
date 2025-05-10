import { Peer } from "crossws";

interface PeerHeader {
  cookie: string;
}

const users = new Map<string, Peer>();

export default defineWebSocketHandler({
  open(peer) {
    console.log("[ws] open", peer);
    
  },

  message(peer, message) {
    if (message.text().includes("ping")) {
      peer.send("pong");
      return;
    }

    const auth = getAuthCookie((peer.headers as any as PeerHeader).cookie);
    if (!auth) {
      peer.send("unauthorized");
      return;
    }

  },

  close(peer, event) {
    console.log("[ws] close", peer, event);
  },

  error(peer, error) {
    console.log("[ws] error", peer, error);
  },
});

function getAuthCookie(cookies: string) {
  for (const cookie of splitCookiesString(cookies)) {
    const [key, value] = cookie.split("=");
    if (key === "auth") {
      return value;
    }
  }
  return false;
}

export function sendDataToUser(userId: string, data: any) {
  const user = users.get(userId);
  if (!user) {
    return;
  }
  user.send(data);
}