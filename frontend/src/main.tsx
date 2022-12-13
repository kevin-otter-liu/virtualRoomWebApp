import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {
  LoadingContextProvider,
} from './context/loading-context';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <LoadingContextProvider>
      <App />
    </LoadingContextProvider>
  </React.StrictMode>,
)
