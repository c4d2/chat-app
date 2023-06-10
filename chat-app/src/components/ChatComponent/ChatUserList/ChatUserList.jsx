import React, { useEffect, useState } from 'react'

//引入接口
import { reqGetAllUsers } from '../../../api/users'

import { ReactComponent as Online } from '../../../asset/svg/ChatUserListSvg/online.svg'
import { ReactComponent as Outline } from '../../../asset/svg/ChatUserListSvg/outline.svg'

//引入样式
import './chatuserlist.less';
import { UserOutlined } from '@ant-design/icons';

//引入本地用户信息
import storageUtils from '../../../utils/storageUtils';
import { Avatar, Badge, message } from 'antd';

const ChatUserList = (props) => {
    //存储用户数据
    const [userData, setUserdata] = useState([])

    //是否高亮
    const [activeIndex, setactiveIndex] = useState(null);

    //其他用户发来的信息
    const [receiveMsg, setReceiveMsg] = useState('');

    useState(() => {
        //设置用户信息
        setUserdata(userData);
        //如果有新用户登录则数据添加进来
    }, []);

    useEffect(() => {
        //从用户当前本地信息里面获取用户的信息
        const user = storageUtils.getUser();
        //获取列表信息
        const allusers = reqGetAllUsers(user._id)
        allusers.then((response) => {
            if (response.statusText === 'OK') {
                //将除了当前用户的其他用户信息全部存在userdata
                // console.log(response.data)
                setUserdata(response.data);
            } else {
                message.warning('出错了！');
            }
            // console.log(response)
        }).catch(e => {
            console.error(e)
        })
    }, []);

    //点击某个用户的聊天框
    const handleChatUser = (item, index) => {
        // console.log(item)
        //设置给父元素传递
        props.setOtherUser(item);

        //修改本地内存数据
        storageUtils.saveOtherUser(item);

        // 点击的时候呈现另外的list样式
        setactiveIndex(index);
        props.getmsg();
    };

    return (
        <div className='ChatUserList'>
            <ul>
                {
                    userData.map((item, index) => {
                        return (
                            <li
                                key={item._id}
                                onClick={() => handleChatUser(item, index)}
                                className={activeIndex === index || item._id === storageUtils.getOtherUser()._id ? 'li_active' : ''}
                            >
                                {/* <Badge count={1}>
                                    <Avatar shape="square" icon={<UserOutlined />} />
                                </Badge> */}
                                <img src={item.avatarImage} alt="" />
                                <span>{item.username}</span>
                                <span>{receiveMsg}</span>
                                {
                                    item.isAvatarImageSet === true && item.online === true ? <Online className='svg' /> : <Outline className='svg' />
                                }

                            </li>
                        )
                    })
                }

            </ul>
        </div>
    )
}

export default ChatUserList;