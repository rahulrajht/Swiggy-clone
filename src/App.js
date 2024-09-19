import React from 'react';
import Nav from './component/Nav';
import { Outlet , useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import HomeScreen from './screen/HomeScreen';

function App() {
  const location = useLocation();

  return (
    <Provider store={store}>
    <div>
      <Nav />
      <div className="container px-8 ">
        {location.pathname === '/' && (
          <HomeScreen />
        )}
        <Outlet />
      </div>
    </div>
    </Provider>
  );
}

export default App;