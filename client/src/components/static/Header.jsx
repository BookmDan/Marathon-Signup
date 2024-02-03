// import  { useState } from 'react';
// import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import { UserContext } from "./App";

const Header=() =>{
  // const navigate = useNavigate() 
  // const [user, setUser] = useState()

  // const handleLogoutClick = () => {
  //   fetch("/logout", { method: "DELETE" }).then((r) => {
  //     if (r.ok) {
  //       updateUser(null)
  //       navigate('/authentication')
  //       setUser(null);
  //     }
  //   });
  // }
{/* <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/">
        Race App
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">
            Home
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
          {!user && (
            <>
              <Nav.Link as={Link} to="/register">
                Register
              </Nav.Link>
              <Nav.Link as={Link} to="/authentication">
                Login
              </Nav.Link>
            </>
          )}
        </Nav>
        {(user)? <Button onClick={handleLogoutClick}>Logout</Button> : ""}
      </Navbar.Collapse>
    </Navbar> */}
  return (
    <ul>
      <li><Link to='/'>Home</Link></li>
      <li><Link to='/register'>Sign Up</Link></li>
      <li></li>
    </ul>
  );
}


export default Header;
