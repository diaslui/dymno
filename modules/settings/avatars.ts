import { Avatar } from "../core/types";

export const avatars: Array<Avatar> = [
    {
        id: "0",
        url: "/assets/img/avatar/0.jpg"
    },
    {
        id: "1",
        url: "/assets/img/avatar/1.jpg"
    },
    {
        id: "2",
        url: "/assets/img/avatar/2.jpg"
    },
    {
        id: "3",
        url: "/assets/img/avatar/3.jpg"
    },
    {
        id: "4",
        url: "/assets/img/avatar/4.jpg"
    },
    {
        id: "5",
        url: "/assets/img/avatar/5.jpg"
    },
    {
        id: "6",
        url: "/assets/img/avatar/6.jpg"
    },
]

export const getAvatarById = (avatarId:string): string => {

    const avatar = avatars.find((avatar) => avatar.id == avatarId)
    
    if (!avatar){
        return avatars[0].url;
    }


    return avatar.url
}