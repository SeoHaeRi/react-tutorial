import React from 'react';
import ErrorBoundary from './ErrorBoundary';
import User from './User';

function App() {
  const user = {
    id: 1,
    username: 'velopert'
  };
  return (
    <ErrorBoundary>
      <User />
    </ErrorBoundary>);
}

export default App;
