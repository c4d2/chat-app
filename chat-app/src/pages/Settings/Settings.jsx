import React from 'react';
import { Tabs } from 'antd';

import Account from '../../components/SettingsComponent/SettingsAccount/Account';
import UpdateAccount from '../../components/SettingsComponent/SettingsAccount/UpdateAccount';
import About from '../../components/SettingsComponent/About/About';

import './settings.less'


export default function Settings() {

  const items = [
    {
      key: '1',
      label: `账号设置`,
      children: <Account />,
    },
    {
      key: '2',
      label: `修改信息`,
      children: <UpdateAccount />,
    },
    {
      key: '3',
      label: `消息通知`,
      children: `有待开拓`,
    },
    {
      key: '4',
      label: `通用设置`,
      children: `有待开拓`,
    },
    {
      key: '5',
      label: `修改密码`,
      children: `有待开拓`,
    },
    {
      key: '6',
      label: `关于chat`,
      children: <About />,
    },
  ];

  return (
    <div className='Settings'>
      <div className='tabs'>
        <Tabs
          tabPosition="left"
          items={items}
        />
      </div>
    </div>
  )
}
