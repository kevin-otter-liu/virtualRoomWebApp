import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './routes/Root'
import './index.css'


import {createBrowserRouter,RouterProvider} from 'react-router-dom';

const router = createBrowserRouter([
  {path:"/",element:<Root/>}
])
import {
  LoadingContextProvider,
} from './context/loading-context';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <LoadingContextProvider>
      <RouterProvider router={router}></RouterProvider>
    </LoadingContextProvider>
  </React.StrictMode>,
)
