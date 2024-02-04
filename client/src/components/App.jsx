import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NewUser from './forms/NewUser';
import Home from "./static/Home";
import Header from "./static/Header";
import Authentication from "./Authentication";
import RaceInfo from './static/RaceInfo';
import Results from './static/Results';
import Photos from './static/Photos';
import Volunteer from './static/Volunteer';
import Shop from './static/Shop';
import RefundPolicy from './RefundPolicy';
import Directions from './Directions';
import SignupForm from "./forms/SignupForm";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser();
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    fetch('/api/raceEvents')
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
      .catch(error => {
        setUser(null);
      });
  };

  const updateUser = (userData) => {
    setUser(userData);
  };

  const logoutUser = () => {
    // Implement logic to clear user session and cookies on the server side
    fetch('/logout', { method: 'POST' })
      .then(() => {
        setUser(null);
      });
  };

  return (
    <Router>
      <Header onLogout={logoutUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <SignupForm onLogin={updateUser} />}
        />
        <Route path="/signup" element={<SignupForm/>} />
        <Route path ="/register" element={<SignupForm/>}/>
        <Route path="/race-info" element={<RaceInfo />} />
        <Route path="/results" element={<Results />} />
        <Route path="/photos" element={<Photos />} />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/directions" element={<Directions />} />
      </Routes>
    </Router>
  );
};

export default App;
