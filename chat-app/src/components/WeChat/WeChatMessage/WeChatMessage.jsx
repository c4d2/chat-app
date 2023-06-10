import React, { useEffect, useState, useRef } from 'react';

import './wechatmessage.less';

import { reqGetChatMessage } from '../../../api/wechatmessage';

import io from 'socket.io-client';
//引入外部url数据
import { SOCKET_URL } from '../../../constants/constants';
import storageUtils from '../../../utils/storageUtils';

const socket = io(SOCKET_URL); // 创建 Socket.IO 客户端实例
//引入momentjs
const moment = require('moment');

export default function WeChatMessage() {
    const messagesEndRef = useRef();
    const [allMeassage, setAllMessage] = useState([]);
    //获取内存当前用户
    const user = storageUtils.getUser();

    useEffect(() => {
        //获取所有消息
        const getallmessage = reqGetChatMessage();
        getallmessage.then((response) => {
            console.log(response)
            if (response.statusText === 'OK') {
                setAllMessage(response.data);
            }
        }).catch(e => {
            console.error(e);
        })
    }, [])

    useEffect(() => {
        // console.log(11)
        socket.on('chat-room', (message) => {
            // console.log(message);
            // console.log(user, otheruser)
            //这种情况是为消息是当前用户发送的
            setAllMessage([...allMeassage, message])
        });
    }, [allMeassage])


    // 当消息列表更新时，将消息列表滚动到最底部
    useEffect(() => {
        // console.log(allMeassage)
        // console.log('滑到最底部！')
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: 'end' });
    }, [allMeassage]);

    return (
        <div className='WeChatMessage'>
            {
                allMeassage.map((item, index) => {
                    return (
                        <div key={index} className='receive-content' style={item.userid === user._id ? { 'flexDirection': 'row-reverse' } : null}>
                            {
                                item.userid !== user._id && (
                                    <div className='img-span'>
                                        <img className='img' src={item.avatarImage} alt="" />
                                        <span>{item.username}</span>
                                    </div>
                                )
                            }
                            <div ref={messagesEndRef} key={index} className='receive' style={item.userid === user._id ? { 'alignItems': 'flex-end' } : null} >
                                <div className='receive_message' style={item.userid === user._id ? null : { 'backgroundColor': '#E4E6F1', 'color': '#626470' }}>
                                    <p>{item.message}</p>
                                </div>
                                <span>{moment(item.currenttime).format('HH:mm:ss')}</span>
                            </div>
                        </div >
                    )
                })
            }
        </div >
    )
}
