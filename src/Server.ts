require("dotenv").config();
import express from 'express';
import dateAndTime from "date-and-time"
import { Client } from 'discord.js';
//@ts-ignore
import { badges } from "discord-badges";
import imageToBase64 from 'image-to-base64';
import createSvg from "./Lib/CreateSvg";
import { IUser } from './Interfaces/User';

const server = express();

server.set('view engine', 'ejs');

const client = new Client();

server.get("/", async (req, res) => {

    const userId = req.query.userId;
    const bg = req.query.bg as string;
    const info = req.query.info as string;
    const User = await client.users.fetch(userId as string);
    const Badges = await badges(User)

    const badgesUrl = await Promise.all(Badges.map(async (e: any) => {
        return "data:image/png;base64,"+ await imageToBase64(e.url);
    }))

    const userAvatar = User.avatarURL({ size: 2048, dynamic: true }) as string
    const userAvatar_gif: boolean = userAvatar.includes(".gif");
    const user: IUser = {
        username: User.username,
        tag: User.tag,
        avatarUrl: `data:image/${userAvatar_gif ? "gif" : "png"};base64,`+ (await imageToBase64(userAvatar)),
        badges: badgesUrl,
        background: bg ? `data:image/png;base64,`+ await imageToBase64(bg) : "#484343",
        background_url: bg ? true : false,
        createdAt: dateAndTime.format(User.createdAt, "YYYY-MM-DD"),
        info: info
    };

    res.setHeader("Content-Type", "image/svg+xml; charset=utf-8");
    res.send(createSvg(user));
});

server.listen(process.env.PORT ? process.env.PORT : 8080);
client.login(process.env.TOKEN);