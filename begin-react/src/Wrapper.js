import React from 'react';

//컴포넌트 태그 사이에 넣은 값을 조회하고 싶을 때
function Wrapper({ children }){
    const style = {
        border: '2px solid black',
        padding: 16
    };

    return <div style={style}>{children}</div>
}

export default Wrapper;