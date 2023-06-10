import React, { useEffect, useState } from 'react'
// import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';

//引入样式
import './chat.less';

//引入组件
import ChatInput from '../../components/ChatComponent/ChatInput/ChatInput';
import ChatContent from '../../components/ChatComponent/ChatContent/ChatContent';
import ChatUserList from '../../components/ChatComponent/ChatUserList/ChatUserList';
import { message } from 'antd';
import Welcome from '../../components/ChatComponent/Welcome/Welcome';

import { reqGetMessage } from '../../api/message';

export default function Chat() {

  //获取到storage中的数据
  const user = storageUtils.getUser();

  const getmsg = () => {
    const otheruser = storageUtils.getOtherUser();
    //获取当前用户的消息
    const getmessage = reqGetMessage(user._id, otheruser._id);

    getmessage.then(response => {
      // //返回的消息
      // console.log(response)
      //如果返回的消息为ok
      if (response.statusText === 'OK') {
        // console.log(response)
        setUsermessage(response.data);
        // 则设置一下message
      } else {
        message.error('出错了');
      }
    }).catch(e => {
      console.error(e)
    })
  }

  useEffect(() => {
    //获取数据
    getmsg();
  }, []);



  //获取对面聊天用户信息
  const [otherUser, setOtherUser] = useState(storageUtils.getOtherUser());
  //存储用户消息数据
  const [usermessage, setUsermessage] = useState([]);

  return (
    <div className='Chat_Total'>
      <div className='Chat_contacts'>
        <h1>消息</h1>
        <ChatUserList getmsg={getmsg} setUsermessage={setUsermessage} setOtherUser={setOtherUser} className='Chat_userlist' />
      </div>

      {
        JSON.stringify(otherUser) === "{}" ? (<Welcome />) : (<div className='Chat_main'>
          <div className='Chat_main_header'>
            <div className='avatar'>
              <img src={otherUser.avatarImage} alt="" />
              <span className='username'>{otherUser.username}</span>
            </div>
          </div>
          <ChatContent usermessage={usermessage} setUsermessage={setUsermessage} />
          <ChatInput />
        </div>)
      }
    </div>
  )
}
