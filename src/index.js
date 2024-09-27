import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createBrowserRouter,RouterProvider } from "react-router-dom";

const RestrauntDetails = lazy(()=> import('./component/RestrauntDetails'));
const Collections = lazy(()=> import("./component/Collections"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/collections/:id",
        element: <Suspense fallback={<h1>loading ...</h1>}> <Collections /></Suspense>,
      },
      {
        path: "/restraunt/:id",
        element: <Suspense fallback={<h1>loading ...</h1>}> <RestrauntDetails /> </Suspense>,
      },
    ]
  },

  ]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />)