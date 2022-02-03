import { Template } from "./template";

export interface Rule {
    name: string,
    description: string,
    created_at: string,
}

export interface Topic extends Template {
    user_followed_id: number,
    user_moderator_id: number,
    title: string,
    headline: string,
    description: string,
    image_url: string,
    image_name: string,
    icon_image_url: string,
    icon_image_name: string,
    number_of_followers: number;
    moderators: [{ username: string, user_id: number; }];
    rules: Rule[]
}