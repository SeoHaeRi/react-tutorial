import React from 'react';
import './App.scss';
import Button from './Components/button';

function App() {
  return (
    <div className="App">
      <div className="buttons">
        <Button size= "large">Button</Button>
        <Button color="gray">Button</Button>
        <Button size= "small" color="pink">Button</Button>

      </div>
    </div>
  );
}

export default App;
