import ajax from "./ajax";

import { CHATMESSAGE_URL } from "../constants/constants";

//添加聊天室消息
export const reqAddChatMessage = (userid, message, avatarImage, username) => ajax(CHATMESSAGE_URL + '/addchatmsg', { userid, message, avatarImage, username }, 'POST');

//获取聊天室消息
export const reqGetChatMessage = () => ajax(CHATMESSAGE_URL + '/getchatmsg', {});