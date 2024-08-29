import React from 'react';
import Nav from './component/Nav';
import Suggestion from './component/Suggestion';
import TopRestraunt from './component/TopRestraunt';
import { Outlet , useLocation } from 'react-router-dom';
import Layout from './component/Layout';
import OnlineRestraunt from './component/OnlineRestraunt';

function App() {
  const location = useLocation();

  return (
    <div>
      <Nav />
      <div className="container px-8 m-auto">
        {location.pathname === '/' && (
          <>
            <Suggestion />
            <TopRestraunt />
            <OnlineRestraunt />
          </>
        )}
        <Outlet />
      </div>
    </div>
  );
}

export default App;