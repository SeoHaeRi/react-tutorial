import React, {
  useRef,
  useState,
  useReducer,
  useMemo,
  useCallback,
  createContext,
} from "react";
import "./App.css";
import Hello from "./Hello";
import Wrapper from "./Wrapper";
import Counter from "./Counter";
import InputSample from "./InputSample";
import UserList from "./UserList";
import CreateUser from "./CreateUser";
import useInputs from "./useInputs";
import produce from "immer";

function countActiveUsers(users) {
  console.log("활성 사용자 수를 세는 중...");
  return users.filter((user) => user.active).length;
}

const initialState = {
  // inputs: {
  //   username: '',
  //   email: '',
  // },
  users: [
    {
      id: 1,
      username: "velopert",
      email: "public.velopert@gmail.com",
      active: true,
    },
    {
      id: 2,
      username: "tester",
      email: "tester@example.com",
      active: false,
    },
    {
      id: 3,
      username: "liz",
      email: "liz@example.com",
      active: false,
    },
  ],
};

function reducer(state, action) {
  switch (action.type) {
    case "CHANGE_INPUT":
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.name]: action.value,
        },
      };
    case "CREATE_USER":
      return {
        inputs: initialState.inputs,
        users: state.users.concat(action.user),
      };
    case "TOGGLE_USER":
      return produce(state, (draft) => {
        const user = draft.users.find((user) => user.id === action.id);
        user.active = !user.active;
      });

    // return {
    //   ...state,
    //   users: state.users.map(user =>
    //     user.id === action.id ? {...user, active: !user.active} : user
    //   )
    // };
    case "REMOVE_USER":
      return {
        //...state,
        users: state.users.filter((user) => user.id !== action.id),
      };
    default:
      return state;
  }
}

export const UserDispatch = createContext(null);

function App() {
  const [{ username, email }, onChange, reset] = useInputs({
    username: "",
    email: "",
  });

  //초기값 할당
  const [state, dispatch] = useReducer(reducer, initialState);
  const nextId = useRef(4);
  //state에서 필요한 값들을 비구조화 할당 문법을 사용하여 추출
  const { users } = state;

  /* useInputs 사용하여 초기 설정시 필요없어짐 */
  //const { username, email } = state.inputs;

  // const onChange = useCallback(e => {
  //   const { name, value } = e.target;
  //   dispatch({
  //     type: 'CHANGE_INPUT',
  //     name,
  //     value
  //   });
  // }, []);

  const onCreate = useCallback(() => {
    dispatch({
      type: "CREATE_USER",
      user: {
        id: nextId.current,
        username,
        email,
      },
    });
    reset();
    nextId.current += 1;
  }, [username, email, reset]);

  /* Context API 이용 dispatch 바로 전달 시 주석처리*/
  // const onToggle = useCallback(id => {
  //   dispatch({
  //     type: 'TOGGLE_USER',
  //     id
  //   });
  // }, []);

  // const onRemove = useCallback(id => {
  //   dispatch({
  //     type: 'REMOVE_USER',
  //     id
  //   });
  // }, []);

  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <UserDispatch.Provider value={dispatch}>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList
        users={users}
        // onToggle={onToggle}
        // onRemove={onRemove}
      />
      <div>활성 사용자 수 : {count}</div>
    </UserDispatch.Provider>
  );

  // const name = 'react';
  // //객체 형태로 css 넣어주기
  // const style = {
  //   backgroundColor: 'black',
  //   color: 'aqua',
  //   fontSize: 24,
  //   padding: '1rem'
  // };

  // const [inputs, setInputs] = useState({
  //   username: '',
  //   email: ''
  // });

  // const { username, email } = inputs;

  // const onChange = useCallback(e => {
  //   const { name, value } = e.target;
  //   setInputs({
  //     ...inputs,  //복사 후(spread 연산자)
  //     [name]: value //추가
  //   });
  // }, [inputs] );  //inputs가 바뀔 때만 onChange다시 생성

  // const [users, setUsers] = useState([
  //   {
  //     id: 1,
  //     username: 'velopert',
  //     email: 'public.velopert@gmail.com',
  //     active: true
  //   },
  //   {
  //     id: 2,
  //     username: 'tester',
  //     email: 'tester@example.com',
  //     active: false
  //   },
  //   {
  //     id: 3,
  //     username: 'liz',
  //     email: 'liz@example.com',
  //     active: false
  //   }
  // ]);

  // const nextId = useRef(4);

  // const onCreate = useCallback(() => {
  //   const user = {
  //     id : nextId.current,
  //     username,
  //     email
  //   };

  //   setUsers(users => [...users, user]);

  //   setInputs({
  //     username: '',
  //     email: ''
  //   });
  //   nextId.current += 1;
  // }, [username, email]);

  // const onRemove = useCallback(id => {
  //   // user.id 가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듦
  //   // = user.id 가 id 인 것을 제거함
  //   setUsers(users => users.filter(user => user.id !== id));
  // }, [] );

  // const onToggle = useCallback(id => {
  //   setUsers(users => users.map(
  //     //id가 같다면 active 값 반전
  //     user => user.id === id
  //     ? { ...user, active: !user.active }
  //     : user
  //   ));
  // }, []);

  // const count = useMemo( () => countActiveUsers(users), [users] );

  // return (
  //   <>
  //     <CreateUser
  //       username={username}
  //       email={email}
  //       onChange={onChange}
  //       onCreate={onCreate}
  //     />
  //     <UserList
  //       users={users}
  //       onRemove={onRemove}
  //       onToggle={onToggle}
  //     />
  //     <div>활성 사용자 수 : {count}</div>

  //     <Counter />
  //     {/* <InputSample />

  //     <Wrapper>
  //       <Hello name="react" color="red" isSpecial={true} />
  //       <Hello color="pink" />
  //       <div style={style}>{name}</div>
  //       <div className="gray-box"></div>
  //     </Wrapper> */}

  //   </>
  // );
}

export default App;
