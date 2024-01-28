import { useState, createContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import AppNavbar from "./AppNavbar"; // Import the AppNavbar component

export const UserContext = createContext(null);

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div>
        <UserContext.Provider value={[user, setUser]}>
          <AppNavbar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
        </UserContext.Provider>
      </div>
    </Router>
  );
}

export default App;
