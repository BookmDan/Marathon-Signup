// import React from 'react';
import { useEffect, useState, createContext } from "react";
import { Switch, Route } from "react-router-dom";
// import "bootswatch/dist/flatly/bootstrap.min.css";

import Home from "./Home";
import Header from "./Header";
import Login from "./Login";

export const UserContext = createContext(null)

function App() {
  const [user, setUser] = useState(null)
  useEffect(() => {
    fetch("/check_session")
    .then(r => {
      if (r.ok) {
        r.json().then(user => setUser(user))

      }
    });
  }, [])

  if (!user) return (
    <div>
      <UserContext.Provider value={[user, setUser]}>
        <Header/>
        <Login onLogin={setUser}/>
      </UserContext.Provider>
    </div>
  )

  return (
    <div>
    <UserContext.Provider value={[user, setUser]}>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
      </Switch>
    </UserContext.Provider>
    </div>
  )
}
export default App;
