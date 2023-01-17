import React from 'react';
import Profile from './Profile';
import { Link, Route, Routes } from 'react-router-dom';

function Profiles() {
  return (
    <div>
      <h3>사용자 목록</h3>
      <ul>
        <li><Link to="homer">homer</Link></li>
        <li><Link to="haeri">haeri</Link></li>
      </ul>

      <Routes>
        <Route path="/*" element={<div>유저를 선택해주세요.</div>} />
        <Route path=":username" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default Profiles;