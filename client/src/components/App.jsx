import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Header from "./Header";
// import Navigation from "./Navigation"
import Authentication from "./Authentication"
import RaceInfo from './RaceInfo';
import Results from './Results';
import Photos from './Photos';
import Volunteer from './Volunteer';
import Shop from './Shop';
import RefundPolicy from './RefundPolicy';
import Directions from './Directions';
import SignupForm from "./forms/SignupForm";


// export const UserContext = createContext(null);

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser()
  }, [])
  
  const fetchUser = () => {
    fetch('/authorized')
    .then(res => {
      if (res.ok) {
        res.json().then(data => {
          setUser(data)
        })
      } else {
        setUser(null)
      }
    })
  }

  const updateUser = (user) => setUser(user)
  if (!user) return (
    <>
      {/* <Navigation /> */}
      <Authentication udpateUser = {updateUser}/>
    </>
  )
    // < UserContext.Provider value = { [user, setUser]} >
  // </UserContext.Provider>
  // <Navigation onUpdateUser={updateUser} />
  return (
    <>

    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path ="/register" element={<SignupForm/>}/>
          <Route  path="/race-info" element={<RaceInfo/>}/>
          <Route  path="/results" element={<Results/>}/>
          <Route path="/photos" element={<Photos/>}/>
          <Route path="/volunteer" element={<Volunteer/>}/>
          <Route path="/shop" element={<Shop/>}/>
          <Route path="/refund-policy" element={<RefundPolicy/>}/>
          <Route path="/directions" element={<Directions/>}/>
        </Routes>
      </div>
    </Router>
    </>
  );
}
export default App;
