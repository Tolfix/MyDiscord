require("dotenv").config();
const express = require('express');
const { Client } = require('discord.js');
const { badges } = require("discord-badges");

const server = express();

server.set('view engine', 'ejs');

const client = new Client();

function getColor(string)
{
    if(string === "offline")
        return "#5B5B5B";

    if(string === "online")
        return "#57F287";

    if(string === "idle")
        return "#FEE75C";

    if(string === "dnd")
        return "#ED4245";

    return "#5B5B5B";
}

function getColorBackground(string)
{
    if(string === "offline")
    return "#525252";

    if(string === "online")
        return "#215933";

    if(string === "idle")
        return "#887B2F";

    if(string === "dnd")
        return "#802425";

    return "#525252";
}

server.get("/", async (req, res) => {

    const userId = req.query.userId;
    const User = await client.users.fetch(userId);
    const Badges = await badges(User)

    const user = {
        username: User.username,
        tag: User.tag,
        avatarUrl: User.avatarURL({ size: 2048, dynamic: true }),
        badges: Badges,
        status: User.presence.status,
        statusColor: getColor(User.presence.status),
        bg: getColorBackground(User.presence.status),
        activity: User.presence.activities
    };

    res.render("Discord", {
        user
    });
});

server.listen(process.env.PORT ? process.env.PORT : 8080);
client.login(process.env.TOKEN);