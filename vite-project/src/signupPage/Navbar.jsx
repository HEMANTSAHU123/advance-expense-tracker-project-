import React from 'react';
import { Navbar, Nav, NavLink } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MyNavbar = () => {
  return (
    <Navbar>
     
    
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto" style={{marginRight:"-20%"}}>
          <NavLink as={Link} to="/contact" className="nav-link">
        contact
          </NavLink>
          <NavLink as={Link} to="/About" className="nav-link">
            About
          </NavLink>
          <NavLink as={Link} to="/Home" className="nav-link">
            Home
          </NavLink>
       
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNavbar;