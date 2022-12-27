import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from './pages/Root';
import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import { LoadingContextProvider } from './context/loading-context';
import { ErrorContextProvider } from './context/error-context';
import { AuthContextProvider } from './context/auth-context';
import OptionsPage from './pages/OptionsPage';
import CreateVirtualHousePage from './pages/CreateVirtualHousePage';

const router = createBrowserRouter([
  { path: '/', element: <Root />, errorElement: <ErrorPage /> },
  { path: '/options', element: <OptionsPage /> },
  { path: '/my-virtual-houses', element: <CreateVirtualHousePage /> },

]);

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
