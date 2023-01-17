import React, { createContext, useContext, useState } from 'react';

const MyContext = createContext('defaultValue');

function Child() {
    const text = useContext(MyContext);
    return <div>{text}</div>
}

function Parent() {
    return <Child />
}

function ContextSample() {
    const [value, setValue] = useState(true);
    return(
        <MyContext.Provider value = {value ? 'Good' : 'Bad'}>
            <Parent />
            <button onClick = { () => setValue(!value)}>Click Me</button>
        </MyContext.Provider>
    )
}