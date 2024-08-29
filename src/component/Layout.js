import React from 'react';
import Nav from './Nav';

const Layout = ({ children }) => {
  return (
    <div>
      <Nav />
      <div className="container px-8 m-auto">
        {children}
      </div>
    </div>
  );
};

export default Layout;
