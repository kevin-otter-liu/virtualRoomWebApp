import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from './routes/Root';
import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([{ path: '/', element: <Root /> }]);
import { LoadingContextProvider } from './context/loading-context';
import { ErrorContextProvider } from './context/error-context';
import { AuthContextProvider } from './context/auth-context';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorContextProvider>
      <AuthContextProvider>
        <LoadingContextProvider>
          <RouterProvider router={router}></RouterProvider>
        </LoadingContextProvider>
      </AuthContextProvider>
    </ErrorContextProvider>
  </React.StrictMode>
);
