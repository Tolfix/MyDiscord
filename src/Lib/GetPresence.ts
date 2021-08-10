import { stripIndent } from "common-tags";
import { PresenceStatus, ActivityType, Activity } from "discord.js";

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

export function PresenceActivityType(type: ActivityType)
{
    if(type === "LISTENING")
        return "Listening to";
}

export function TextAbstract(text: string|null, length: number)
{
    if (text == null)
        return "";

    if (text.length <= length)
        return text;

    text = text.substring(0, length);
    let last = text.lastIndexOf(" ");
    text = text.substring(0, last);
    return text + "...";
}

export function PrintActivityFormated(activity: Activity): string
{
    if(activity.type === "LISTENING")
        return stripIndent`
        Listening to ${activity.name}
        ${TextAbstract(activity.details, 24)}
        by ${TextAbstract(activity.state, 24)}
        `;

    if(activity.type === "STREAMING")
        return stripIndent`

        `;

    if(activity.type === "PLAYING")
        return stripIndent`
        Playing a game
        ${activity.name}
        ${TextAbstract(activity.details, 24)}
        ${TextAbstract(activity.state, 24)}
        `

    return stripIndent`
    ${activity.name}
    ${activity.details}
    ${activity.state}
    `
}