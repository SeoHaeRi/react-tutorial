import React, { useContext, useEffect } from 'react';
import { UserDispatch } from './App';

const User= React.memo(function User({ user }) {
    const { username, email, id, active } = user;

    const dispatch = useContext(UserDispatch);

    useEffect( () => {
        console.log('컨포넌트가 화면에 나타남');
        return () => {
            console.log('컴포넌트가 화면에서 사라짐');
        };
    }, [user]);
    return (
        <div>
            <b
                style={{ //{ 값 } 이어서 { {} }
                    color: active ? 'green' : 'black',
                    cursor: 'pointer'
                }}
                onClick={() => dispatch({
                    type: 'TOGGLE_USER',
                    id
                })} //onToggle(id)}
            >{username}</b> <span>{email}</span>
            {/* user.id를 전달받는 함수 생성 표시 : () => ~~ */}
            <button onClick={() => dispatch({
                type: 'REMOVE_USER',
                id
            })}> {/*onRemove(id)}>*/}
            삭제</button>
        </div>
    );
});

function UserList({ users }) {

    return (
        <div>
            {/* <User user={users[0]} />
            <User user={users[1]} />
            <User user={users[2]} /> */}
            {
                users.map(user => (<User user={user} key={user.id} />)
                )
            }
        </div>
    );
}

export default React.memo(UserList);