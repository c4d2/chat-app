import ajax from "./ajax";

import { USER_URL } from "../constants/constants";
//登录接口
export const reqLogin = (username, password) => ajax(USER_URL + '/login', { username, password }, 'POST');

//注册用户接口
export const reqRegister = (username, email, password) => ajax(USER_URL + '/register', { username, email, password }, 'POST');

//设置头像
export const reqSetAvatar = (id, image) => ajax(USER_URL + `/setavatar/${id}`, { image }, 'POST');

//获取除了当前用户的所有其他在线用户
export const reqGetAllOnlineUsers = (id) => ajax(USER_URL + `/allonlineusers/${id}`, {});

//获取除了当前用户的所有其他用户
export const reqGetAllUsers = (id) => ajax(USER_URL + `/allusers/${id}`, {})

//登出
export const reqLogout = (id) => ajax(USER_URL + `/logout/${id}`, {});

//更新用户
export const reqUpdateUser = (id, email, brief) => ajax(USER_URL + `/updateuser/${id}`, { email, brief }, 'POST');