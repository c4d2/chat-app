import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { Route, Routes } from 'react-router-dom';

//引入样式
import './admin.less';

//引入组件
import LefNav from '../../components/LefNav/LefNav';
import Chat from '../Chat/Chat';
import Settings from '../Settings/Settings';
import WeChat from '../../components/WeChat/WeChat';

//本地内存
import storageUtils from '../../utils/storageUtils';

export default function Admin() {

    const [focus, setFocus] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {

        const user = storageUtils.getUser();

        if (JSON.stringify(user) === "{}") {
            //如果里面没有就跳转登录界面
            navigate('/loginre')
        } else if (JSON.stringify(user) !== "{}" && user.isAvatarImageSet === false) {
            //如果没设置头像则跳转到头像界面
            navigate('/setAvatar')
        }
    }, [navigate])

    return (
        <div className='Chat'>
            <div className='Chat_container'>
                <div className='lefnav'>
                    <LefNav setFocus={setFocus} focus={focus} />
                </div>
                {
                    focus === 0 ? <Chat /> : (
                        focus === 1 ? <WeChat /> : <Settings />
                    )
                }
            </div>
        </div>

    )
}
