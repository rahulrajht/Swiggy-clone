import React from 'react';
import Nav from './component/Nav';
import Suggestion from './component/Suggestion';
import TopRestraunt from './component/TopRestraunt';
import { Outlet , useLocation } from 'react-router-dom';
import Layout from './component/Layout';
import OnlineRestraunt from './component/OnlineRestraunt';
import { Provider } from 'react-redux';
import store from './utils/store';

function App() {
  const location = useLocation();

  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;