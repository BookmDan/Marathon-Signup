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
  const[userId, setUserId] = useState(null)

  const login = (user) => {
    setCurrentUser(user)
    setLoggedIn(true)
  }

  const logout = () => {
    setCurrentUser(null)
    setLoggedIn(false)
  }
  return (
    <UserContext.Provider value={{ currentUser, loggedIn, login, logout, userId,setUserId }} >
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }
// export const useUser = () => useContext(UserContext);
