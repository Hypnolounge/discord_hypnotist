import axios from "axios";
import { error } from "console";


export default async function getUserIdentity(token: string) {
    if (!token) {
        throw {error: "No token specified"}
    }
      
    const user = await axios.get('https://discord.com/api/v10/users/@me', {
    headers: {
        Authorization: `Bearer ${token}`,
    },
    });

    if (!user.data){
        throw {error: "Received no data from Discord"}
    }
    return user.data;
}