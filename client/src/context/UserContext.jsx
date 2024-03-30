import { useState,createContext, useEffect} from "react";

const UserContext = createContext({
  currentUser: null,
  loggedIn: false,
  login: () => {},
  logout: () => {}
})

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || null)
  const [loggedIn, setLoggedIn] = useState(currentUser !== null)
  // const[userId, setUserId] = useState(null)

  useEffect(() => {
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }, [currentUser]);

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