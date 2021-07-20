import { IUser } from "../Interfaces/User";
import { Canvas, createCanvas, loadImage  } from "canvas"

export async function CreatePNG(user: IUser): Promise<Canvas>
{
    let width = 495;
    let height = 295;

    const avatar = await loadImage(user.avatarUrl);
    const background = user.background_url ? await loadImage(user.background ?? "") : undefined

    let canvas = createCanvas(width, height),
    ctx = canvas.getContext('2d');

    // Draw background
    ctx.beginPath();
        if(user.background_url)
        {
            ctx.drawImage(background, 0, 0, width, height)
        }
        else
        {
            ctx.fillStyle = user.background as string;
            ctx.fillRect(0, 0, width, height*2);
        }
        ctx.closePath()
    ctx.stroke();

    // Draw panel front
    ctx.beginPath();
        ctx.fillStyle = "#23272A";
        ctx.fillRect(0, Math.floor(width/3), width, height*2);
        ctx.stroke();
    ctx.closePath();

    // Print name
    ctx.font = 'bold 20px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = "center";
    ctx.fillText(`${user.tag}`, canvas.width / 2, canvas.height / 1.5);
    let countBadge = 0;
    for(const badge of user.badges)
    {
        const b = await loadImage(badge);
        ctx.drawImage(b, 200+((countBadge)*35), canvas.height / 1.4, 30, 30);
        countBadge++
    }

    ctx.font = 'bold 20px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = "center";
    ctx.fillText(`${user.createdAt}`, canvas.width / 2, canvas.height / 1.1);

    // ctx.drawImage(avatar, canvas.width / 15, canvas.height / 3.5, 150, 150);

    return Promise.resolve(canvas)
}