import ajax from "./ajax";

import { MESSAGE_URL } from "../constants/constants";

//增加消息
export const reqAddMessage = (from, to, message) => ajax(MESSAGE_URL + '/addmsg', { from, to, message }, 'POST');

//获取消息
export const reqGetMessage = (from, to) => ajax(MESSAGE_URL + '/getmsg', { from, to }, 'POST');