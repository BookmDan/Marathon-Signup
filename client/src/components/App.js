import { BrowserRouter as Switch, Routes, Route, Link } from 'react-router-dom';
import { useEffect, useState, createContext } from "react";
import Login from "./Login";
import NewUser from './NewUser'; // Import your NewUser component
export const UserContext = createContext(null)

// const Navigation = () => (
//   <nav>
//     <ul>
//       <li>
//         <Link to="/register">Register</Link> 
//       </li>
//     </ul>
//   </nav>
// );


// const App = () => (
  
//   <Router>
//     <Navigation />
    // <Routes>
    //   <Route path="/register" element={<NewUser/>} />
    // </Routes>
//   </Router>
// );
//   <Route path="/"> element ={<Home/>}/>
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
export default App
