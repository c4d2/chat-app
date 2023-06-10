import React, { useEffect } from 'react';
import storageUtils from '../../utils/storageUtils';

import { Tooltip, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import { ReactComponent as Settings } from '../../asset/svg/LefNavSvg/settings.svg'; // 你的 '*.svg' 文件路径
import { ReactComponent as Home } from '../../asset/svg/LefNavSvg/home.svg';
import { ReactComponent as Chat } from '../../asset/svg/LefNavSvg/chat.svg';
import { ReactComponent as SettingsActive } from '../../asset/svg/LefNavSvg/settings_active.svg';
import { ReactComponent as HomeActive } from '../../asset/svg/LefNavSvg/home_active.svg';
import { ReactComponent as ChatActive } from '../../asset/svg/LefNavSvg/chat_active.svg';
import { ReactComponent as AllUser } from '../../asset/svg/LefNavSvg/alluser.svg';
import { ReactComponent as AllUserActive } from '../../asset/svg/LefNavSvg/alluser_active.svg';
import { ReactComponent as WeChat } from '../../asset/svg/LefNavSvg/wechat.svg';
import { ReactComponent as WeChatActive } from '../../asset/svg/LefNavSvg/wechat_active.svg';

import './lefnav.less'

export default function LefNav(props) {

    //获取当前用户信息
    const userinfo = storageUtils.getUser();
    useEffect(() => {
        console.log(userinfo)
    }, [])

    //气泡框显示用户信息
    const text = (
        <div style={{ 'padding': '10px' }}>
            <p> 姓名：{userinfo.username}</p>
            <p> 邮箱：{userinfo.email}</p>
        </div>
    );
    return (
        <div className='UserInfo'>
            <div className='avatarImage'>
                <img src={userinfo.avatarImage} alt="" />
                <Tooltip placement="bottomRight" title={text} trigger={'hover'} color='#B6BBF8'>
                    <a onClick={(e) => e.preventDefault()}>
                        <Space>
                            {userinfo.username}
                            <DownOutlined />
                        </Space>
                    </a>
                </Tooltip>
            </div>
            <div className='applilist'>
                <div className={props.focus === 0 ? 'svg active_svg' : 'svg'} onClick={() => { props.setFocus(0) }}>
                    {
                        props.focus === 0 ? <ChatActive className="icon" /> : <Chat className="icon" />
                    }
                </div>
                <div className={props.focus === 1 ? 'svg active_svg' : 'svg'} onClick={() => { props.setFocus(1) }}>
                    {
                        props.focus === 1 ? <WeChatActive className="icon" /> : <WeChat className="icon" />
                    }
                </div>
                <div className={props.focus === 2 ? 'svg active_svg' : 'svg'} onClick={() => { props.setFocus(2) }}>
                    {
                        props.focus === 2 ? <SettingsActive className="icon" /> : <Settings className="icon" />
                    }
                </div>

            </div>
        </div>
    )
}
