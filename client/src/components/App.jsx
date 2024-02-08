import { useState, useEffect, createContext } from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./static/Home";
import NavigationHeader from "./static/NavigationHeader";
import Authentication from "./sessions/Authentication";
import RaceEvents from './static/RaceEvents';
import Results from './static/Results';
import Photos from './static/Photos';
import Volunteer from './static/Volunteer';
import Shop from './static/Shop';
import RefundPolicy from './RefundPolicy';
import Directions from './Directions';

export const UserContext = createContext(null)

const App = () => {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(null);

  const login = (user) => {
    setUser(user);
    setLoggedIn(true)
  }

  useEffect(() => {
    fetchEvents()
    fetchUser()
    fetch("/api/check_session")
    .then(r => {
      if (r.ok) {
        r.json().then(user => setUser(user))

      }
    });
  }, [])

  if (!user) return (
    <div>
      <UserContext.Provider value={[user, setUser]}>
        <NavigationHeader />
        <Authentication onLogin={setUser}/>
      </UserContext.Provider>
    </div>
  )

  const fetchEvents = () => {
    fetch('/api/race-events')
  }

  const fetchUser = () => {
    fetch('/api/users')
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('User not authenticated');
        }
      })
      .then(data => {
        setUser(data);
      })

  };

  const updateUser = (userData) => {
    setUser(userData);
  };

  const logoutUser = () => {
    fetch("/api/logout", {
      method: "DELETE",
      credentials: "include", // include credentials such as cookies
    })
      .then((response) => {
        if (response.ok) {
          // If the server returns a success response, set the user to null
          setUser(null);
          setLoggedIn(false)
        } else {
          // Handle error cases
          console.error("Logout failed:", response.status);
        }
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
  };

  return (
    <Router>
      <UserContext.Provider value={[user, setUser]}>
        <NavigationHeader onLogout={logoutUser} />
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Authentication updateUser={updateUser} />}
          />
          <Route
            path="/login"
            element={<Authentication updateUser={updateUser} />}
          />
          <Route path ="/signup" element={<Authentication/>}/>
          <Route path="/race-events" element={<RaceEvents />} />
          <Route path="/results" element={<Results />} />
          <Route path="/photos" element={<Photos/>} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/directions" element={<Directions />} />
        </Routes>
      </UserContext.Provider>
    </Router>
  );
};

export default App;
