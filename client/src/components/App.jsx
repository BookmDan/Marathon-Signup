import { useState, useEffect, createContext, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./static/Home";
import NavigationHeader from "./static/NavigationHeader";
import Login from "./sessions/Login";
import RaceInfo from './static/RaceInfo';
import Results from './static/Results';
import Photos from './static/Photos';
import Volunteer from './static/Volunteer';
import SelectRace from "./user-flow/SelectRace";
import TheWhy from "./user-flow/TheWhy";
import Agreement from "./user-flow/Agreement";
import ShipPacket from "./user-flow/ShipPacket";
import Shop from "./user-flow/Shop";
import Payment from "./user-flow/Payment";
import PurchaseSummary from "./user-flow/PurchaseSummary";
import { CostProvider } from '../context/CostContext';
import ThankYou from "./user-flow/ThankYou";
import MyAccount from "./static/MyAccount";
import {UserContext} from '../context/UserContext'


const App = () => {
  const [user, setUser] = useState(null);
  const [raceEvents, setRaceEvents] = useState(null);
  const [raceEvent, setRaceEvent] = useState(null);

  const [isDarkMode, setIsDarkMode] = useState(false);
  const { logout,currentUser } = useContext(UserContext)
  const options = {
    mode: 'payment',
    amount: 1099,
    currency: 'usd',
    // Customizable with appearance API.
    appearance: {/*...*/},
  };

  const fetchUser = () => {
    fetch('/api/check-session')
    .then(res => {
      if (res.ok) {
        res.json().then(user=>setUser(user));
      } else {
        setUser(null)
        throw new Error('User not authenticated');
      }
    })
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    setIsDarkMode(savedTheme === 'dark');
    
    fetchUser();
    fetchRaceEvents();
    fetchRaceEventData();
  }, [])
  
  const handleToggleTheme = (newMode) => {
    setIsDarkMode(newMode);
  };
  
  //***** */ move fetchRaceEvents to the event cards or places where they should be fetched 
  
  const fetchRaceEventData = () => {
    fetch("/api/race-event")
      .then((response) => response.json())
      .then((data) => {
        setRaceEvent(data); 
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
      setRaceEvents(data);
    })
    .catch(error => {
      console.error('Error fetching race events:', error);
    });
  };

  const updateUser = (user) => setUser(user)

  const logoutUser = () => {
    fetch("/api/logout", {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setUser(null);
          logout(user)
        } else {
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
        <NavigationHeader onLogout={logoutUser} isDarkMode={isDarkMode} handleToggleTheme={handleToggleTheme} />
        <CostProvider>
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> :
                <Login
                  onLogin={updateUser}
                />
              }
            />
            <Route
              path="/signup"
              element={<Login onLogin={updateUser} />} />
            <Route
              path="/select-race/" element={<SelectRace raceEvents={raceEvents}  />} />
            <Route path="/my-account" element={<MyAccount />} />
            <Route path="/agreement/:selectedRaceId/:userId" element={<Agreement raceEvent={raceEvent} currentUser={user}  />} />
            <Route path="/the-why" element={<TheWhy />} />
            <Route path="/ship-packet" element={<ShipPacket />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/purchase-summary" element={<PurchaseSummary />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/race-info" element={<RaceInfo />} />
            <Route path="/results" element={<Results />} />
            <Route path="/photos" element={<Photos />} />
            <Route path="/volunteer" element={<Volunteer />} />
          </Routes>
        </CostProvider>
      </Router>
    </div>
  );
};

export default App;