import {useState, useContext} from 'react'
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import ThemeToggle from '../cards-boxes-search/ThemeToggle';
import { UserContext } from "../App";


const NavigationHeader = ({ onLogout }) => {
  const navigate = useNavigate()
  const [isDarkMode, setIsDarkMode] = useState(false);
    
  const handleLogoutClick = () => {
    fetch("/api/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }
  const [user, setUser] = useContext(UserContext)
  // const handleLogout = () => {
  //   onLogout(); // Call the provided logout function
  //   navigate('/'); // Navigate to the home page or any other desired page after logout
  // };

  const handleThemeToggle = (newMode) => {
    setIsDarkMode(newMode);
  };

  // <Navbar.Toggle aria-controls="basic-navbar-nav" />
  // <button onClick={handleLogout}>Logout</button>
  return (
    <div>
      <Navbar bg={isDarkMode ? 'dark' : 'light'} expand="lg">
        <Navbar.Brand as={Link} to="/">
          Run Your Socks Off 
        </Navbar.Brand>
        <ThemeToggle onToggle={handleThemeToggle} aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/login">
              Sign Up
            </Nav.Link>
            <Nav.Link as={Link} to="/race-info">
              Race Info
            </Nav.Link>
            <Nav.Link as={Link} to="/results">
              Results
            </Nav.Link>
            <Nav.Link as={Link} to="/photos">
              Photos
            </Nav.Link>
            <Nav.Link as={Link} to="/volunteer">
              Volunteer
            </Nav.Link>
            <NavDropdown title="More" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/shop">
                Shop
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/refund-policy">
                Refund Policy
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/directions">
                Directions
              </NavDropdown.Item>
            </NavDropdown>
            {user && user.isLoggedIn? <Button onClick={handleLogoutClick}>Logout</Button> : ""}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
};

export default NavigationHeader;
