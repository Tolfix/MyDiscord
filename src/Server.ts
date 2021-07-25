require("dotenv").config();
import express from 'express';
import { Client } from 'discord.js';
import createSvg from "./Lib/CreateSvg";
import { getUser } from './Lib/GetUser';
import { CreatePNG } from './Lib/CreatePNG';
import DiscordBanner from "discord-banner";

const server = express();

server.set('view engine', 'ejs');

DiscordBanner();
const client = new Client();

client.on("ready", () => {
    client.user?.setPresence({
        status: "dnd",
        activity: {
            name: `for new readme`,
            type: "WATCHING",
        }
    });
});

server.get("/", async (req, res) => {
    console.log(`SVG requested`)
    res.setHeader("Content-Type", "image/svg+xml; charset=utf-8");
    res.send(createSvg(await getUser(res, req, client)));
});

server.get("/png", async (req, res) => {
    res.setHeader('Content-Type', 'image/png');
    console.log(`PNG requested`)
    const stream = (await CreatePNG(await getUser(res,req,client, false))).createPNGStream();
    stream.pipe(res);
});

server.listen(process.env.PORT ? process.env.PORT : 8080);
client.login(process.env.TOKEN);
