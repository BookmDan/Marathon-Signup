// import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import AppNavbar from "./AppNavbar"; 

function App() {
  return (
    <Router>
      <div>
        <AppNavbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          {/* Add other routes as needed */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
