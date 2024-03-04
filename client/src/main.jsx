import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.jsx'
import { BrowserRouter as Router } from 'react-router-dom';
import { CreditCardProvider } from './context/CreditCardContext.jsx'
import {UserProvider } from './context/UserContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <CreditCardProvider>
        <App />
      </CreditCardProvider>
    </UserProvider>
  </React.StrictMode>,
)

