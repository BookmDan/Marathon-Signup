import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.jsx'
import { CreditCardProvider } from './context/CreditCardContext.jsx'
import { UserProvider } from './context/UserContext.jsx'
import { Provider } from 'react-redux';
import { store } from './redux/store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <CreditCardProvider>
        <UserProvider >
          <App />
        </UserProvider>
      </CreditCardProvider>
    </Provider>
  </React.StrictMode>,
)
