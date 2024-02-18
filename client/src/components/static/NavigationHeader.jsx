import { Navbar, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import ThemeToggle from '../cards-boxes-search/ThemeToggle';

const NavigationHeader = ({ onLogout, isDarkMode,handleToggleTheme }) => {
  const navigate = useNavigate()
    
  const handleLogout = () => {
    onLogout(); // Call the provided logout function
    navigate('/'); 
  };

  return (
    <div>
      <Navbar bg={isDarkMode ? 'dark' : 'light'} expand="lg">
        <Navbar.Brand as={Link} to="/">
          Run Your Socks Off 
        </Navbar.Brand>
        <ThemeToggle onToggle={handleToggleTheme}  aria-controls="basic-navbar-nav"  />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {/* <Nav.Link as={Link} to="/login"></Nav.Link> */}
            <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
            <Nav.Link as={Link} to="/race-info">Race Info</Nav.Link>
            <Nav.Link as={Link} to="/select-race">Select Race</Nav.Link>
            <Nav.Link as={Link} to="/results">Results</Nav.Link>
            <Nav.Link as={Link} to="/photos">Photos</Nav.Link>
            <Nav.Link as={Link} to="/volunteer">Volunteer</Nav.Link>
            <Nav.Link as={Link} to="/shop">
              Shop
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
};

export default NavigationHeader;