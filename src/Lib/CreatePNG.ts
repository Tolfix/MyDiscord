import { IUser } from "../Interfaces/User";
import { Canvas, createCanvas, loadImage  } from "canvas"
import { GetColorStatus, PrintActivityFormated } from "./GetPresence";

export async function CreatePNG(user: IUser): Promise<Canvas>
{
    let width = 495;
    let height = 295;

    const avatar = await loadImage(user.avatarUrl);
    const background = user.background_url ? await loadImage(user.background ?? "https://cdn.tolfix.com/images/TX-Small.png") : undefined

    let canvas = createCanvas(width, height),
    ctx = canvas.getContext('2d');

    // Draw background
    ctx.beginPath();
        if(user.background_url)
        {
            ctx.drawImage(background, 0, 0, width, height/1.7)
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
        ctx.shadowColor = "#1B1E20";
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = -5;
        ctx.shadowBlur = 6;
        ctx.fillStyle = "#23272A";
        ctx.fillRect(-20, Math.floor(width/3), width*1.5, height*2);
        ctx.stroke();
    ctx.closePath();

    ctx.font = 'bold 20px Arial';
    ctx.shadowColor = "black";
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 2;
    ctx.shadowBlur = 2;
    ctx.fillStyle = '#ffffff';
    
    ctx.textAlign = "center"
    // Print name
    ctx.fillText(`${user.tag}`, canvas.width / 5, canvas.height / 1.05);

    ctx.textAlign = "start";
    // Print badges
    let countBadge = 0;
    for(const badge of user.badges)
    {
        const b = await loadImage(badge);
        ctx.drawImage(b, 200+((countBadge)*35), canvas.height / 1.66, 30, 30);
        countBadge++
    }

    // Print created at
    if(user.createdAt)
        ctx.fillText(`${user.createdAt}`, canvas.width / 2.5, canvas.height / 1.25);

    if(user.presence.activities.length > 0)
    {
        for(const activity of user.presence.activities)
        {
            if(activity.type !== "CUSTOM_STATUS")
            {
                // const activtyImage = await loadImage(`https://cdn.discordapp.com/app-assets/383226320970055681/`+activity.assets?.largeImage+".png")
                const activtyImage = await loadImage((activity.assets?.largeImageURL())?.replace(".webp", ".png") ?? "")
                ctx.drawImage(activtyImage, 340, 220, 70, 70);
                ctx.font = 'bold 10px Arial';
                ctx.fillText(PrintActivityFormated(activity), canvas.width / 1.45, canvas.height / 1.6);
                break;
            }
        }

        ctx.font = 'bold 20px Arial';
        // Line
        ctx.beginPath();
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.strokeStyle = '#23272A';
            ctx.moveTo(canvas.width / 1.5, Math.floor(width/3));
            ctx.lineTo(canvas.width / 1.5, 500);
        ctx.stroke();
        
    }
    // Print profile picture
    ctx.save();
        ctx.beginPath();
        ctx.arc(canvas.width / 5, canvas.height / 1.8, 80, 0, 2 * Math.PI, false);

        ctx.shadowColor = "black";
        ctx.shadowOffsetX = 5;
        ctx.shadowOffsetY = 2;
        ctx.shadowBlur = 5;

        ctx.lineWidth = 7;

        // Make the stroke transparent
        ctx.strokeStyle = user.circleStrokeColor ?? "#23272A";
        
        ctx.stroke();

        ctx.clip();
        
        ctx.drawImage(avatar, 10, 80, 180, 180);

        ctx.closePath();
    ctx.restore();

    ctx.save();
        ctx.beginPath();
        
        ctx.arc(canvas.width / 3.44, canvas.height / 1.3, 15, 0, 2 * Math.PI, false);

        ctx.shadowColor = "";
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 0;
        ctx.lineWidth = 3;        

        ctx.strokeStyle = "#23272A";

        ctx.fillStyle = GetColorStatus(user.presence.status);
        
        ctx.fill();
        
        ctx.stroke();
        
        ctx.clip();

        ctx.closePath();
    ctx.restore();


    return Promise.resolve(canvas)
}