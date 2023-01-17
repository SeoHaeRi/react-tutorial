import { useState, useCallback } from 'react';

function useInputs(initialForm) {
    //form 이라는 상태 선언
    const [form, setForm] = useState(initialForm);
    
    const onChange = useCallback( e => {
        const { name, value } = e.target;
        setForm(form => ({...form, [name] : value}))
    }, []);

    const reset = useCallback(() => setForm(initialForm), [initialForm]);

    //배열 형태로 반환
    return [form, onChange, reset];
};

export default useInputs;