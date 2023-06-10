import React, { useEffect } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

//引入组件
// import Chat from './pages/Chat/Chat';
import LoginAndRegister from './pages/LoginAndRegister/LoginAndRegister';
import SetAvatar from './pages/SetAvatar/SetAvatar';
import Admin from './pages/Admin/Admin';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 登录 注册页面 */}
        <Route path="/loginre" element={<LoginAndRegister />} />
        {/* 设置头像界面 */}
        <Route path="/setavatar" element={<SetAvatar />} />
        <Route path="/" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}