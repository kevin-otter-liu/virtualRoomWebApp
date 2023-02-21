import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from './pages/Root';
import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import { LoadingContextProvider } from './context/loading-context';
import { ErrorContextProvider } from './context/error-context';
import { AuthContextProvider } from './context/auth-context';
import CreateVirtualHousePage from './pages/CreateVirtualHousePage';
import { VirtualHouseProvider } from './context/virtual-house-context';
import MyVirtualHousesPage from './pages/MyVirtualHousesPage';
import OptionsPage from './pages/OptionsPage';
import UploadListingPage from './pages/UploadListingPage';
import SearchListingPage from './pages/SearchListingPage';
import MyListingsPage from './pages/MyListingsPage';

const router = createBrowserRouter([
  { path: '/', element: <Root />, errorElement: <ErrorPage /> },
  { path: '/virtual-house-create', element: <CreateVirtualHousePage /> },
  { path: '/my-virtual-houses', element: <MyVirtualHousesPage /> },
  { path: '/options', element: <OptionsPage /> },
  { path: '/upload-listing', element: <UploadListingPage /> },
  { path: '/search-listing', element: <SearchListingPage /> },
  { path: '/my-listings', element: <MyListingsPage /> },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorContextProvider>
      <AuthContextProvider>
        <LoadingContextProvider>
          <VirtualHouseProvider>
            <RouterProvider router={router}></RouterProvider>
          </VirtualHouseProvider>
        </LoadingContextProvider>
      </AuthContextProvider>
    </ErrorContextProvider>
  </React.StrictMode>
);
