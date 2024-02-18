import { useState, useEffect, createContext } from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./static/Home";
import NavigationHeader from "./static/NavigationHeader";
import Login from "./sessions/Login";
import RaceInfo from './static/RaceInfo';
import RaceDetailsPage from "./static/RaceDetailsPage";
import Results from './static/Results';
import Photos from './static/Photos';
import Volunteer from './static/Volunteer';
import RefundPolicy from './RefundPolicy';
import Directions from './Directions';
import SelectRace from "./user-flow/SelectRace";
import TheWhy from "./user-flow/TheWhy";
import Agreement from "./user-flow/Agreement";
import ShipPacket from "./user-flow/ShipPacket";
import Shop from "./user-flow/Shop";
import Payment from "./user-flow/Payment";
import PurchaseSummary from "./user-flow/PurchaseSummary";
import { CostProvider } from '../context/CostContext';
// import { UserProvider } from "../context/UserContext";

export const UserContext = createContext(null)

const App = () => {
  const [user, setUser] = useState([]);
  const [raceEvents, setRaceEvents] = useState(null);
  const [raceEvent, setRaceEvent] = useState(null);
  const [loggedIn, setLoggedIn] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    setIsDarkMode(savedTheme === 'dark');

    fetch("/api/check-session")
      .then(r => {
        if (r.ok) {
          r.json().then(user => setUser(user))
        }
      })
      // fetchUser();
      // fetchRaceEvents();
      // fetchRaceEventData();
  }, [])
  
  const handleToggleTheme = (newMode) => {
    setIsDarkMode(newMode);
  };

  if (!user) return (
    <div>
    <UserContext.Provider value={[user, setUser]}>
      <NavigationHeader />
        <Login onLogin={setUser}/>
    </UserContext.Provider>
  </div>
  )
  //***** */ move fetchRaceEvents to the event cards or places where they should be fetched 
  
  // const login = (user) => {
  //   setUser(user);
  //   setLoggedIn(true)
  // }
  useEffect(() => {
    fetchUser();
    fetchRaceEvents();
    fetchRaceEventData();
  }, []);


  const fetchRaceEventData = () => {
    fetch("/api/race-event")
      .then((response) => response.json())
      .then((data) => {
        setRaceEvent(data); // Set the fetched data to state
      })
      .catch((error) => {
        console.error("Error fetching race event data:", error);
      });
  };

  const fetchRaceEvents = () => {
    fetch('/api/race-events')
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error('Failed to fetch race events');
      }
    })
    .then(data => {
      // Update the raceEvents state with the fetched data
      setRaceEvents(data);
    })
    .catch(error => {
      console.error('Error fetching race events:', error);
    });
};

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
    <div  className={isDarkMode ? 'dark' : ''}>
      <Router>
        <UserContext.Provider value={[user, setUser]}>
          <NavigationHeader onLogout={logoutUser} isDarkMode={isDarkMode} handleToggleTheme={handleToggleTheme} />
          <CostProvider>
            <Routes>
              <Route
                path="/"
                element={user ? <Home /> : <Login
                  updateUser={updateUser} />}
              />
              {/* <Route path="/" element={Home} /> */}
              <Route path="/signup" element={<Login />} />
              <Route path="/agreement/:id" element={<Agreement raceEvent={raceEvent} />} />
              <Route path="/the-why" element={<TheWhy />} />
              <Route path="/race-details/:id" component={RaceDetailsPage} />
              <Route path="/race-info" element={<RaceInfo />} />
              <Route path="/results" element={<Results />} />
              <Route path="/photos" element={<Photos />} />
              <Route path="/volunteer" element={<Volunteer />} />
              <Route path="/select-race" element={<SelectRace raceEvents={raceEvents} />} />
              <Route path="/ship-packet" element={<ShipPacket/>} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/purchase-summary" element={<PurchaseSummary/>} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/refund-policy" element={<RefundPolicy />} />
              <Route path="/directions" element={<Directions />} />
            </Routes>
          </CostProvider>
        </UserContext.Provider>
      </Router>
    </div>
  );
};
export default App;