import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"; //, Route, Routes 
import NewUser from './forms/NewUser'; 
// import Home from "./static/Home";
import Header from "./static/Header";
// import Navigation from "./Navigation"
import Authentication from "./Authentication"
// import RaceInfo from './static/RaceInfo';
// import Results from './static/Results';
// import Photos from './static/Photos';
// import Volunteer from './static/Volunteer';
// import Shop from './static/Shop';
// import RefundPolicy from './RefundPolicy';
// import Directions from './Directions';
// import SignupForm from "./forms/SignupForm";

// function App() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     fetchUser()
//   }, [])
  
//   const fetchUser = () => {
//     fetch('/authorized')
//     .then(res => {
//       if (res.ok) {
//         res.json().then(data => {
//           setUser(data)
//         })
//       } else {
//         setUser(null)
//       }
//     })
//   }

//   const updateUser = (user) => setUser(user)
//   if (!user) return (
//     <>
//       {/* <Navigation /> */}
//       <Authentication udpateUser = {updateUser}/>
//     </>
//   )
    // < UserContext.Provider value = { [user, setUser]} >
  // </UserContext.Provider>
  // <Navigation onUpdateUser={updateUser} />
//   <div>
//   <Routes>
//     <Route path="/" element={<Home/>}/>
//     <Route path ="/register" element={<SignupForm/>}/>
//     <Route  path="/race-info" element={<RaceInfo/>}/>
//     <Route  path="/results" element={<Results/>}/>
//     <Route path="/photos" element={<Photos/>}/>
//     <Route path="/volunteer" element={<Volunteer/>}/>
//     <Route path="/shop" element={<Shop/>}/>
//     <Route path="/refund-policy" element={<RefundPolicy/>}/>
//     <Route path="/directions" element={<Directions/>}/>
//   </Routes>
// </div>

//   return (
//     <Router>
//       <Header />
     
//     </Router>
//   );
  // }
  const Navigation = () => (
    <nav>
      <ul>
        <li>
          <Link to="/register">Register</Link> 
        </li>
      </ul>
    </nav>
  );
  
  const App = () => (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/register" element={<NewUser/>} /> 
      </Routes>
    </Router>
  );
export default App;
