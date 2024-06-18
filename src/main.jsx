import React from 'react'
import ReactDOM from 'react-dom/client'
import { GlobalStyles } from './styles/global';
import Router from './routes';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStyles/>
    <Router />
  </React.StrictMode>,
)
