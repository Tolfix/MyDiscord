import Converter from 'dominant-color-converter'
import { GetBanner } from './GetBanner';
const converter = new Converter();

export default async function GetStrokeColors(
    stroke_circle: string, 
    banner: string,
    userAvatar: string,
    userId: string,
)
{
    let stroke;
    console.log()
    if(stroke_circle === "profile")
        stroke = ((await converter.convert(userAvatar)).muted) as string
    
    if(stroke_circle === "banner" && banner !== "true")
        stroke = ((await converter.convert(banner)).muted) as string
    
    if(stroke_circle && stroke_circle.length === 6 && !banner)
        stroke = "#"+stroke_circle;

    if(stroke_circle === "banner" && banner === "true")
        stroke = ((await converter.convert(await GetBanner(userId) ?? "")).muted) as string

    return stroke;
}