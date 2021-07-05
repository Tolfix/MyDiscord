import Converter from 'dominant-color-converter'
const converter = new Converter();

export default async function GetStrokeColors(
    stroke_circle: string, 
    banner: string,
    userAvatar: string
)
{
    let stroke;
    if(stroke_circle === "profile")
        stroke = ((await converter.convert(userAvatar)).muted) as string
    
    if(stroke_circle === "banner" && banner)
        stroke = ((await converter.convert(banner)).muted) as string
    
    if(stroke_circle && stroke_circle.length === 6 && !banner)
        stroke = "#"+stroke_circle;

    return stroke;
}