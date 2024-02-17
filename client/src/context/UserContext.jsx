import { useState,createContext  } from "react";

const UserContext = createContext({})

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false)

  const login = (user) => {
    setCurrentUser(user)
    setLoggedIn(true)
  }

  const logout = () => {
    setCurrentUser(null)
    setLoggedIn(false)
  }
  return <UserContext.Provider value={{currentUser, loggedIn, login, logout}} >{children}</UserContext.Provider>
}

export {UserContext, UserProvider}