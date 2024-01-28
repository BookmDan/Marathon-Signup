import { useEffect, useState, createContext } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import Header from "./Header";
import Login from "./Login";

export const UserContext = createContext(null);

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/api/check_session") // Adjust the endpoint as needed
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("User not authenticated");
        }
      })
      .then((user) => setUser(user))
      .catch((error) => {
        // Handle errors, e.g., redirect to login page
        console.error("Error checking session:", error);
      });
  }, []);

  if (!user) {
    return (
      <div>
        <UserContext.Provider value={[user, setUser]}>
          <Header />
          <Login onLogin={setUser} />
        </UserContext.Provider>
      </div>
    );
  }

  return (
    <div>
      <UserContext.Provider value={[user, setUser]}>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          {/* Add other routes as needed */}
        </Switch>
      </UserContext.Provider>
    </div>
  );
}

export default App;
