import { useState,createContext} from "react";

const UserContext = createContext({
  currentUser: null,
  loggedIn: false,
  login: () => {},
  logout: () => {}
})

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false)
  // const[userId, setUserId] = useState(null)

  const login = (user) => {
    setCurrentUser(user)
    setLoggedIn(true)
    console.log("Logged in user:", user);
  }

  const logout = (user) => {
    setCurrentUser(null)
    setLoggedIn(false)
    console.log("Logged out:", user);
  }
  return (
    <UserContext.Provider value={{ currentUser, loggedIn, login, logout,}} >
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }
// userId, setUserId 