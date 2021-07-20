require("dotenv").config();
import express from 'express';
import dateAndTime from "date-and-time"
import { Client } from 'discord.js';
import Converter from 'dominant-color-converter'
import { createCanvas } from "canvas"
const converter = new Converter();
//@ts-ignore
import { badges } from "discord-badges";
import imageToBase64 from 'image-to-base64';
import createSvg from "./Lib/CreateSvg";
import { IUser } from './Interfaces/User';
import GetStrokeColors from './Lib/GetStrokeColor';
import { GetBanner } from './Lib/GetBanner';

const server = express();

server.set('view engine', 'ejs');

const client = new Client();

server.get("/", async (req, res) => {

    const userId = req.query.userId;
    if(!userId)
        res.json({ error: "Please provide a userid (?userId=)" })

    let banner = req.query.banner as string;
    let stroke_circle: string | "profile" | "banner" | undefined = req.query.stroke_circle as undefined;

    const User = await client.users.fetch(userId as string);

    const Badges = await badges(User)   
    const badgesUrl = await Promise.all(Badges.map(async (e: any) => {
        return "data:image/png;base64," + await imageToBase64(e.url);
    }));

    let realBanner = false;
    if(banner === "true")
        realBanner = true;

    // Avatar
    const userAvatar = User.avatarURL({ size: 2048, dynamic: true }) as string
    // Avatar only .jpg for stroke circle
    const userAvatar_ = User.avatarURL({ size: 2048, format: "jpg" }) as string
    // Is it a gif?
    const userAvatar_gif: Boolean = userAvatar.includes(".gif");

    const user: IUser = {
        username: User.username,
        tag: User.tag,
        avatarUrl: `data:image/${userAvatar_gif ? "gif" : "png"};base64,`+ (await imageToBase64(userAvatar)),
        badges: badgesUrl,
        background: realBanner ? `data:image/png;base64,` + await imageToBase64(await GetBanner(User.id) ?? "") : banner ? 
            `data:image/png;base64,`+ await imageToBase64(banner) : 
            ((await converter.convert(userAvatar_)).muted) as string,
        background_url: banner ? true : false,
        createdAt: dateAndTime.format(User.createdAt, "YYYY-MM-DD"),
        circleStrokeColor: stroke_circle ? await GetStrokeColors(stroke_circle, banner, userAvatar_, User.id) : "",
    };

    res.setHeader("Content-Type", "image/svg+xml; charset=utf-8");
    res.send(createSvg(user));
});

server.get("/png", (req, res) => {
    res.setHeader('Content-Type', 'image/png');
    let Canvas = createCanvas(200, 200),
    ctx = Canvas.getContext('2d');

    ctx.font = '30px Impact';
    ctx.rotate(0.1);
    ctx.fillText('Awesome!', 50, 100);
    const stream = Canvas.createPNGStream();
    stream.pipe(res);
})

server.listen(process.env.PORT ? process.env.PORT : 8080);
client.login(process.env.TOKEN);