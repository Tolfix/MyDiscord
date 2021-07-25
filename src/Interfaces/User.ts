import { Presence } from "discord.js";

export interface IUser
{
    username: string;
    tag: string;
    avatarUrl: string;
    badges: Array<any>;
    background: string|null|undefined;
    background_url: Boolean;
    createdAt: string|null;
    circleStrokeColor?: string;
    presence: Presence;
};