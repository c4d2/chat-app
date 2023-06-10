import React, { useState } from 'react';
import { Button, message } from 'antd';

//接口组件
import { reqAddMessage } from '../../../api/message';

import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { BsEmojiSmileFill } from "react-icons/bs";

//引入样式
import './chatinput.less'
import storageUtils from '../../../utils/storageUtils';

import io from 'socket.io-client';

//引入外部url数据
import { SOCKET_URL } from '../../../constants/constants';

const socket = io(SOCKET_URL); // 创建 Socket.IO 客户端实例

export default function ChatInput() {
  const [inputvalue, setInputvalue] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  //监控enter事件
  const handlekeydown = (event) => {
    // console.log(event)
    //如果input里面没有值，则不发送数据
    if (event.keyCode === 13) {
      //发送数据
      sendmessage();
    }
  }

  //监控input中的数据
  const messagecontent = (values) => {
    // console.log(values.target.value)
    //把输入的数据放在msg中
    //提前判断一下数据信息
    // console.log(values.target.value)
    setInputvalue(values.target.value)
  }

  //发送数据
  const sendmessage = () => {
    // console.log(inputvalue)
    if (inputvalue !== null && inputvalue !== undefined && inputvalue !== '') {
      const user = storageUtils.getUser();
      const otheruser = storageUtils.getOtherUser();

      //向后端发送请求
      const addmessage = reqAddMessage(user._id, otheruser._id, inputvalue);
      addmessage.then(response => {
        if (response.statusText === 'OK') {
          // 把输入的信息给后端socket
          socket.emit('add-message', {
            msg: inputvalue,
            from: user._id,
            to: otheruser._id,
            //把当前时间发送给后端
            currenttime: new Date()
          });
          //把input框里面的数据清空
          setInputvalue('');
        }
        // console.log(response)
      }).catch(e => {
        console.error(e)
      })
    } else {
      //提示input框里面未输入任何数据
      message.warning('不能发送空数据')
    }
  }

  const handleEmojiClick = (values) => {
    // console.log(values)
    //把表情添加到inputvalue中
    let inputv = inputvalue + values.native;
    setInputvalue(inputv)
  }

  return (
    <div className='ChatInput'>
      <div className='emoji'>
        <BsEmojiSmileFill color='#B6BBF8' size={'25px'} onClick={() => { setShowEmojiPicker(!showEmojiPicker) }} />
        {showEmojiPicker && (<div style={{ position: 'absolute', bottom: '50px' }}>
          <Picker data={data} onEmojiSelect={handleEmojiClick} />
        </div>)}

      </div>
      <div className='Input_container'>
        <input value={inputvalue} onKeyDown={handlekeydown} onClick={() => { setShowEmojiPicker(false) }} onChange={messagecontent} type="text" className='Input_search' />
        <Button className='Input_button' onClick={sendmessage}>发送</Button>
      </div>
    </div>
  )
}
