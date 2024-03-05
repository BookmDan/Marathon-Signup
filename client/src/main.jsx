import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.jsx'
import { CreditCardProvider } from './context/CreditCardContext.jsx'
// import {UserProvider } from './context/UserContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CreditCardProvider>
      <App />
    </CreditCardProvider>
  </React.StrictMode>,
)

