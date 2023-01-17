import React from 'react';
import { useLocation } from 'react-router-dom';


function About() {
  const { search } = useLocation();
  //현재 지금 경로가(search) '?detail=true' 인지 확인
  const detail = search === '?detail=true';

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