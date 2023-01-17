import React, { useEffect } from 'react';

function HistorySample({ history }) {
    const goBack = () => {
        history.goBack();
    };

    const goHome = () => {
        history.push('/');
    };

    useEffect(() => {
        console.log('history');
        const unblock = history.block('떠날건가?');
        return () => {
            unblock();
        };
    }, [history]);

    return (
        <div>
            <button onClick={goBack}>뒤로가기</button>
            <button onClick={goHome}>홈으로</button>
        </div>
    );
}

export default HistorySample;