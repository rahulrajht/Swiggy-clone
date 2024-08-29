import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Collections from "./component/Collections"
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import RestrauntDetails from './component/RestrauntDetails';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/collections/:id",
        element: <Collections />,
      },
      {
        path: "/restraunt/:id",
        element: <RestrauntDetails />,
      },
    ]
  },

  ]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />)