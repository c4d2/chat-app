import React from 'react';
import { useNavigate } from 'react-router-dom'
import storageUtils from '../../../utils/storageUtils';
//请求后台接口
import { reqLogout } from '../../../api/users';

import { Button, message } from 'antd';

import './account.less'

export default function Account() {
    const userinfo = storageUtils.getUser();

    const navigate = useNavigate();

    //登出  清空本地内存中的数据
    const handleExit = () => {
        //删除内存空间
        storageUtils.deleteUser();
        storageUtils.deleteOtherUser();
        //向后台提交
        const logout = reqLogout(userinfo._id);
        logout.then((response) => {
            // console.log(response.data)
            //显示退出成功界面
            message.success('成功退出~~  下次见')
            //跳转界面
            navigate('/loginre');

        }).catch(e => console.error(e))
    }
    return (
        <div className='Account'>
            <div className='AccoutContent'>
                <img src={userinfo.avatarImage} alt="" />
                <div className='info'>
                    <h2>{userinfo.username}</h2>
                    <span>邮箱号：{userinfo.email}</span>
                </div>
            </div>
            <Button onClick={handleExit}>退出登录</Button>
        </div>
    )
}
