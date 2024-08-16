import React from 'react';
import Nav from './component/Nav';
import Suggestion from './component/Suggestion';

function App() {
  return (
    <div>
      <Nav />
      <div className="container  px-8 m-auto">
        <Suggestion/>
      </div>
    </div>
  );
}

export default App;