import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../../redux/userSlice';

import WeChatHeader from './WeChatHeader/WeChatHeader';
import WeChatInput from './WeChatInput/WeChatInput';
import WeChatMessage from './WeChatMessage/WeChatMessage';

import './wechat.less'

export default function WeChat() {

  const users = useSelector((state) => state.users);

  useEffect(() => {
    console.log(users)
  }, [])

  return (
    <div className='WeChat'>
      <WeChatHeader />
      <WeChatMessage />
      <WeChatInput />
    </div>
  )
}
