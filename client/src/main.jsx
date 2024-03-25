import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.jsx'
import { CreditCardProvider } from './context/CreditCardContext.jsx'
import { UserProvider } from './context/UserContext.jsx'
// import store from "./redux/store";
// import { Provider } from "react-redux";

// value={[user, setUser]}
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CreditCardProvider>
      <UserProvider >
        <App />
      </UserProvider>
    </CreditCardProvider>
  </React.StrictMode>,
)

