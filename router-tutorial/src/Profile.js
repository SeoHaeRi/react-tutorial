import React from 'react';

const profileData = {
    velopert : {
        name : '서해리',
        description: 'Frontend Eng'
    },
    homer: {
        name: '호머 심슨',
        description: 'Dad'
    }
}

function Profile({match}) {
    const { username } = match.params;
    const profile = profileData[username];

    if (!profileData) {
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