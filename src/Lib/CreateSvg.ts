import { IUser } from "../Interfaces/User"

export default function createSvg(user: IUser)
{
    return `
    <svg preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="495" height="195" viewBox="0 0 495 195" fill="none">
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
        ${user.background_url ? `
        <defs>
            <pattern id="img1" preserveAspectRatio="none" patternUnits="userSpaceOnUse" width="100%" height="100%" viewBox="0 0 495 192">
                <image preserveAspectRatio="none" href="${user.background}" width="495" height="192"></image>
            </pattern>
        </defs>
        ` : ""}


        <rect data-testid="card-bg" x="0.5" y="0.5" rx="9.5" height="99%" stroke="#e4e2e2" width="494" fill="${user.background_url ? "url(#img1)" : user.background}" stroke-opacity="0"/>
    
        <defs>
            <pattern id="image" height="100%" width="100%" viewBox="0 0 512 512">
                <image width="512" height="512" xlink:href="${user.avatarUrl}"></image>
            </pattern>
        </defs>
    
        <g>
            <circle transform="translate(-20 20)" cx="20%" cy="40%" r="20%" width="150" height="70%" id="sd" class="medium shadow image" x="5" y="30"  fill="url(#image)" stroke-width="0.5%" />
        </g>
            
        <g data-testid="card-title" transform="translate(15, 35)">
            <g transform="translate(0, 0)">
                <text x="150" y="15" class="header shadow" data-testid="header">${user.tag}</text>
            </g>
        </g>
    
    
        <g transform="translate(15, -25)">
            ${ user.badges.map((badge, index) => { 
                return `<image class="shadow" x="${150+((index)*35)}" y="95" width="25" href="${badge}"></image>`
            }).reduce((a,b) => `${a}${b}`) 
            }
        </g>

        ${user.info ? `
        <g data-testid="card-title" transform="translate(15, 110)">
            <g transform="translate(0, 0)">
                <text x="150" y="15" class="header shadow" data-testid="header">${user.info}</text>
            </g>
        </g>
        ` : ""}


        <g data-testid="card-title" transform="translate(15, 147)">
            <g transform="translate(0, 0)">
                <text x="150" y="15" class="header shadow" data-testid="header">Joined at ${user.createdAt}</text>
            </g>
        </g>

    </svg>`
}