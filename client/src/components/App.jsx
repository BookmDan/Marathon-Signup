import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
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
      <Route path="/register" element={<NewUser/>} /> 
    </Routes>
  </Router>
);

export default App;
