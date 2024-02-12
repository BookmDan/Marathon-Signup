import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./static/Home";
import NavigationHeader from "./static/NavigationHeader";
import Authentication from "./sessions/Authentication";
import RaceEvents from './static/RaceEvents';
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

const App = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState([]);
  const [raceEvents, setRaceEvents] = useState(null);
  const [loggedIn, setLoggedIn] = useState(null);
  const [raceEvent, setRaceEvent] = useState(null);

  const login = (user) => {
    setUser(user);
    setLoggedIn(true)
  }
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
      setLoading(false)
    })
    .catch(error => {
      console.error('Error fetching race events:', error);
      setLoading(false)
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

  // <Route path="/" element={<Home />} />
  return (
    <Router>
      <NavigationHeader onLogout={logoutUser} />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Authentication updateUser={updateUser} />}
          />
          <Route
            path="/login"
            element={<Authentication updateUser={updateUser} />}
          />
          <Route path="/signup" element={<Authentication />} />
          <Route path="/select-race" element={<SelectRace raceEvents={raceEvents} />} />
          <Route path="/agreement" element={<Agreement raceEvent={raceEvent} />} />
          <Route path="/the-why" element={<TheWhy />} />
          <Route path="/ship-packet" element={<ShipPacket/>} />
          <Route path="/race-events" element={<RaceEvents />} />
          <Route path="/race-details/:id" component={RaceDetailsPage} />
          <Route path="/results" element={<Results />} />
          <Route path="/photos" element={<Photos />} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/directions" element={<Directions />} />
        </Routes>
      )}
    </Router>
  );
};
export default App;