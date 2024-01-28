import { useState, createContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Header from "./Header";

export const UserContext = createContext(null);

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div>
        <UserContext.Provider value={[user, setUser]}>
          <Header />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/Register">
              <Home />
            </Route>
          </Switch>
        </UserContext.Provider>
      </div>
    </Router>
  );
}

export default App;
