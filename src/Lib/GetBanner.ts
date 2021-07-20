import fetch from "node-fetch";

export async function GetBanner(clientId: string): Promise<string|null>
{
    let response = await fetch(`https://discord.com/api/v8/users/${clientId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bot ${process.env.TOKEN}`
        }
    })

    const status = response.status;
    if(status === 404)
        return Promise.resolve(null);

    const jsonData = await response.json();

    const banner = jsonData["banner"];

    if(!banner)
        return Promise.resolve(null);

    const isGif = await fetch(`https://cdn.discordapp.com/banners/${clientId}/${banner}.gif`, {
        method: 'GET',
        headers: {
            Authorization: `Bot ${process.env.TOKEN}`
        }
    })

    if(isGif.status === 415)
        return Promise.resolve(`https://cdn.discordapp.com/banners/${clientId}/${banner}.png?size=1024`)

    return Promise.resolve(`https://cdn.discordapp.com/banners/${clientId}/${banner}.gif?size=1024`)
}