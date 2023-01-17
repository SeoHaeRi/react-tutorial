import React from 'react';
import qs from 'qs';

function About({ location }) {
    console.log(location);
    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true
    });
    const detail = query.detail === 'true';

    return (
        <div>
            <h1>소개</h1>
            <p>
                이 프로젝트는 리액트 라우터 실습 예제 프로젝트입니다.
            </p>
            {detail && <p>detail 값이 true 입니다!</p>}
        </div>
    );
}

export default About;