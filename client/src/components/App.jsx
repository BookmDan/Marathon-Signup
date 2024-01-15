// import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// import Home from './Home'; // Import your Home component
// import Posts from './Posts'; // Import your Posts component
// import Favorites from './Favorites'; // Import your Favorites component
import NewUser from './NewUser'; // Import your NewUser component

const Navigation = () => (
  <nav>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/posts">Posts</Link>
      </li>
      <li>
        <Link to="/favorites">Favorites</Link>
      </li>
      <li>
        <Link to="/register">Register</Link> {/* Add a link to the registration page */}
      </li>
    </ul>
  </nav>
);

const App = () => (
  <Router>
    <Navigation />
    {/* <Route path="/" exact component={Home} />
    <Route path="/posts" component={Posts} />
    <Route path="/favorites" component={Favorites} /> */}
    <Route path="/register" component={NewUser} /> 
  </Router>
);

export default App;
