export interface IUser
{
    username: string;
    tag: string;
    avatarUrl: string;
    badges: Array<any>;
    background: string|null;
    background_url: Boolean;
    createdAt: string;
    circleStrokeColor?: string;
};