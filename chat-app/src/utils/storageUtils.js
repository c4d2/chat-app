/*
进行local数据存储管理的工具模块
*/
//导入第三方库进行持久化储存
import store from "store";
// const USER_KEY = 'user_key'
const USER_STORAGE = 'user_key'

//存储其他用户的数据信息
const OTHER_USER_STORAGE = 'other_user_key'

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    // 保存
    saveUser(user) {
        // localStorage.setItem(USER_KEY, JSON.stringify(user));
        store.set(USER_STORAGE, user)
    },
    // 读取
    getUser() {
        // return JSON.parse(localStorage.getItem(USER_KEY) || '{}');
        return store.get(USER_STORAGE) || {};
    },
    // 删除
    deleteUser() {
        // localStorage.removeItem(USER_KEY);
        store.remove(USER_STORAGE);
    },

    // 保存
    saveOtherUser(otheruser) {
        store.set(OTHER_USER_STORAGE, otheruser)
    },
    // 读取
    getOtherUser() {
        return store.get(OTHER_USER_STORAGE) || {};
    },
    // 删除
    deleteOtherUser() {
        store.remove(OTHER_USER_STORAGE);
    }
}