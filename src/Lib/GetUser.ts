
import { Response, Request } from "express";

import dateAndTime from "date-and-time"
import { Client } from 'discord.js';
import Converter from 'dominant-color-converter'
const converter = new Converter();
//@ts-ignore
import { badges } from "discord-badges";
import imageToBase64 from 'image-to-base64';
import { IUser } from '../Interfaces/User';
import GetStrokeColors from './GetStrokeColor';

export async function getUser(res: Response, req: Request, client: Client, toBase64: Boolean = true)
{
    const userId = req.query.userId;
    if(!userId)
        res.json({ error: "Please provide a userid (?userId=)" })

    let banner = req.query.banner as string;
    let stroke_circle: string | "profile" | "banner" | undefined = req.query.stroke_circle as undefined;

    const User = await client.users.fetch(userId as string);

    const Badges = await badges(User)
    const badgesUrl = await Promise.all(Badges.map(async (e: any) => {
        return toBase64 ? "data:image/png;base64," + await imageToBase64(e.url) : e.url;
    }));

    let realBanner = false;
    let bannerUrl = false
    if(banner === "true")
        realBanner = true;

    if(banner && (banner.startsWith("http") || banner.startsWith("https")))
        bannerUrl = true;

    // Avatar
    const userAvatar = User.avatarURL({ size: 2048, dynamic: true }) as string
    // Avatar only .jpg for stroke circle
    const userAvatar_ = User.avatarURL({ size: 2048, format: "jpg" }) as string
    // Is it a gif?
    const userAvatar_gif: Boolean = userAvatar.includes(".gif");

    let avatarURL = toBase64 ? `data:image/${userAvatar_gif ? "gif" : "png"};base64,`+ (await imageToBase64(userAvatar)) : userAvatar_;
    const bannerDiscord = await client.user?.getUserBanner(User.id);
    // mmlol :^)
    let background = toBase64 
                            ?
                                realBanner 
                                            ?
                                                `data:image/png;base64,` + await imageToBase64(bannerDiscord ?? "") 
                                            : 
                                            banner 
                                                ?
                                                    `data:image/png;base64,`+ await imageToBase64(bannerDiscord ?? "")
                                                : 
                                                bannerUrl
                                                ?
                                                    `data:image/png;base64,`+ await imageToBase64(banner ?? "")
                                                :
                                                    ((await converter.convert(userAvatar_)).muted) as string 
                            :   realBanner
                                            ?
                                                bannerDiscord 
                                            :
                                                bannerUrl
                                                ?
                                                    banner
                                                :
                                                    ((await converter.convert(userAvatar_)).muted) as string
                                                

    const user: IUser = {
        username: User.username,
        tag: User.tag,
        avatarUrl: avatarURL,
        badges: badgesUrl,
        background: background,
        background_url: realBanner ? true : banner && bannerUrl ? true : false,
        createdAt: dateAndTime.format(User.createdAt, "YYYY-MM-DD"),
        circleStrokeColor: stroke_circle ? await GetStrokeColors(stroke_circle, banner, userAvatar_, User.id) : "",
    };

    return user;
}