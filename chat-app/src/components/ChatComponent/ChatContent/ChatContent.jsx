import React from 'react';

//引入消息内容组件
import ChatMessage from '../ChatMessage/ChatMessage';

//引入样式文件
import './chatcontent.less'

export default function ChatContent(props) {

  return (
    <div className='ChatContent'>
      <ChatMessage getmsg={props.getmsg} usermessage={props.usermessage} />
    </div>
  )
}
