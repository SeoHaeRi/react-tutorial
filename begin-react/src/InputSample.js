import React, { useRef, useState } from 'react';

function InputSample(){
    //객체 형태의 상태 관리
    const [inputs, setInputs] = useState({
        name: '',
        nickname:''
    });

    //특정 DOM 참조 위함
    const nameInput = useRef();

    const { name, nickname } = inputs;
    const onChange = (e) => {
        const { value, name } = e.target;

        setInputs ({
            ...inputs,
            [name]: value
        });
    };

    const onReset = () => {
        setInputs({
            name: '',
            nickname: '',
        })
        
        //초기화 버튼 누를 시 포커스 이동
        nameInput.current.focus();
    };

    return(
        <div>
            <input 
                name="name" 
                placeholder="이름" 
                onChange={onChange}
                value={name}
                ref={nameInput}
             />
            <input
                name="nickname" 
                placeholder="닉네임" 
                onChange={onChange} 
                value={nickname}
            />
            <button onClick={onReset}>초기화</button>
            <div>
                <b>값 : </b>
                {name} ({nickname})
            </div>
        </div>

    );
}

export default InputSample;