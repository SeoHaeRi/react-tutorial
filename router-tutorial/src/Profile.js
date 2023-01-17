import React from 'react';
import { useParams } from 'react-router-dom';

const profileData = {
  haeri: {
    name: '서해리',
    description: 'Frontend Eng'
  },
  homer: {
    name: '호머 심슨',
    description: 'Dad'
  }
}

function Profile() {
  const { username } = useParams();
  const profile = profileData[username];

  if (!profileData[username]) {
    return <div>존재하지 않는 사용자입니다.</div>
  }

  return (
    <div>
      <h3>{username} {profile.name} </h3>
      <p>
        {profile.description}
      </p>
    </div>
  );
}

export default Profile;