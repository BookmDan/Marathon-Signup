// import { useState } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";

function MarathonNavbar({ onLogout }) {
  const handleLogout = () => {
    fetch("/logout", {
      method: "DELETE",
    }).then(() => onLogout());
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/">Your App Name</Navbar.Brand>
      <Nav className="ml-auto">
        <Button variant="outline-light" onClick={handleLogout}>
          Logout
        </Button>
      </Nav>
    </Navbar>
  );
}

export default MarathonNavbar;
