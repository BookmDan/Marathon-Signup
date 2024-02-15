import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.jsx'
import { CreditCardProvider } from './context/CreditCardContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CreditCardProvider>
      <App />
    </CreditCardProvider>
  </React.StrictMode>,
)

