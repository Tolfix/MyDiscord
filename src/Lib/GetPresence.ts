import { PresenceStatus } from "discord.js";

export function GetColorStatus(status: PresenceStatus): string
{
    if(status === "offline" || status === "invisible")
        return "#2C2F33";

    if(status === "dnd")
        return "#ED4245";

    if(status === "idle")
        return "#FEE75C";

    if(status === "online")
        return "#57F287";

    return "#2C2F33";
}