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

    res.setHeader("Content-Type", "image/svg+xml; charset=utf-8");
    res.setHeader("Content-Type", "image/svg+xml; charset=utf-8");
    res.send(`
<svg xmlns="http://www.w3.org/2000/svg" width="495" height="195" viewBox="0 0 495 195" fill="none">
    <style>
        .header {
            font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif;
            fill: #e2e9ec;
            animation: fadeInAnimation 0.8s ease-in-out forwards;
        }

        .shadow { 
            filter: drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4));
        }
      
    </style>

    <rect data-testid="card-bg" x="0.5" y="0.5" rx="9.5" height="99%" stroke="#e4e2e2" width="494" fill="${user.bg}" stroke-opacity="0"/>

    <defs>
    <pattern id="image" height="100%" width="100%"
                viewBox="0 0 512 512">
        <image width="512" height="512" href="${user.avatarUrl}"></image>
    </pattern>
    </defs>

    <g>
        <circle transform="translate(0 20)" id="sd" class="medium shadow image" cx="20%" cy="40%" r="20%" fill="url(#image)" stroke="${user.statusColor}" stroke-width="0.5%" />
    </g>
        
    <g data-testid="card-title" transform="translate(25, 35)">
        <g transform="translate(0, 0)">
            <text x="150" y="25" class="header shadow" data-testid="header">${user.tag}</text>
        </g>
    </g>

    <g>
        <g transform="translate(0, 0)">
            <text x="200" y="102" class="header shadow" data-testid="header">Status: ${user.status}</text>
        </g>
    </g>

    <g transform="translate(25, 35)">
        ${ user.badges.map((badge, index) => { 
            return `<image class="shadow" x="${150+((index)*35)}" y="95" width="25" href="${badge.url}"></image>`
        }).reduce((a,b) => `${a}${b}`) 
        }
    </g>

</svg>`);
});

server.listen(process.env.PORT ? process.env.PORT : 8080);
client.login(process.env.TOKEN);