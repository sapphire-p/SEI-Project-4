import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import { Nav } from 'react-bootstrap'


const NavBar = () => {

  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="#home">The Potting Shed</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#features">Community</Nav.Link>
          <Nav.Link href="#pricing">Profile</Nav.Link>
        </Nav>
        <Nav className="ml-auto">
          <Nav.Link href="#deets">Register</Nav.Link>
          <Nav.Link href="#memes">Login</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )

}

export default NavBar