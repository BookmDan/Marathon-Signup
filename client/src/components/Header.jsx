import  { useContext } from 'react';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from "./App";
import { useHistory } from "react-router-dom";

function Header({ updateUser }) {
  const history = useHistory()
  const handleLogoutClick = () => {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        updateUser(null)
        history.push('/authentication')
        setUser(null);
      }
    });
  }

  const [user, setUser] = useContext(UserContext)
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/">
        Race App
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
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
        </Nav>
        {(user)? <Button onClick={handleLogoutClick}>Logout</Button> : ""}
      </Navbar.Collapse>
    </Navbar>
  );
}


export default Header;
