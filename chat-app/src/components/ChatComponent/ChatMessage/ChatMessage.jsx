import React, { useEffect, useRef, useState } from 'react';

import storageUtils from '../../../utils/storageUtils';
import './chatmessage.less';

import io from 'socket.io-client';
//引入外部url数据
import { SOCKET_URL } from '../../../constants/constants';

const socket = io(SOCKET_URL); // 创建 Socket.IO 客户端实例
//引入momentjs
const moment = require('moment')

export default function ChatMessage(props) {
  const messagesEndRef = useRef();
  //消息
  const [msg, setMsg] = useState(props.usermessage);

  useEffect(() => {
    //每一次刷新则set一次msg这样可以使得消息总定位在最后一行
    setMsg(props.usermessage);
    //获取本地的对话者信息
    // console.log(111)

  }, [props.usermessage])


  useEffect(() => {
    const user = storageUtils.getUser();
    const otheruser = storageUtils.getOtherUser();
    //将mysql中的数据set在里面
    // 处理从服务器接收到的数据更新
    socket.on('add-message', (message) => {
      // console.log(message);
      // console.log(user, otheruser)
      //这种情况是接收消息
      if ((message.to === user._id && message.from === otheruser._id)) {
        const newmessage = {
          fromSelf: false,
          message: message.msg,
          currenttime: message.currenttime
        }
        setMsg([...msg, newmessage])
      }//这种情况是发送消息
      else if (message.to === otheruser._id && message.from === user._id) {
        console.log('发送消息成功！')
        const newmessage = {
          fromSelf: true,
          message: message.msg,
          currenttime: message.currenttime
        }
        setMsg([...msg, newmessage])
      }
    });
  }, [msg])

  // 当消息列表更新时，将消息列表滚动到最底部
  useEffect(() => {
    // console.log('滑到最底部！')
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: 'end' });
  }, [msg]);

  return (
    <div className='ChatMessage'>
      {
        msg.map((item, index) => {
          return (
            <div key={index} className='receive-content' style={item.fromSelf ? { 'flexDirection': 'row-reverse' } : null}>
              <div ref={messagesEndRef} key={index} className='receive' style={item.fromSelf ? { 'alignItems': 'flex-end' } : null} >
                <div className='receive_message' style={item.fromSelf ? null : { 'backgroundColor': '#E4E6F1', 'color': '#626470' }}>
                  <p>{item.message}</p>
                </div>
                <span>{moment(item.currenttime).format('HH:mm:ss')}</span>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}
