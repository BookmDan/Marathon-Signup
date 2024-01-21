// import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import Home from './Home'; // Import your Home component
// import Posts from './Posts'; // Import your Posts component
// import Favorites from './Favorites'; // Import your Favorites component
import NewUser from './NewUser'; // Import your NewUser component

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
      <Route path="/register" component={NewUser} /> 
    </Routes>
  </Router>
);

export default App;
