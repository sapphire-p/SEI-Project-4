import React, { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { getPayload, getUsernameFromLocalStorage, getUserIdFromLocalStorage } from './helpers/auth'
import Navbar from 'react-bootstrap/Navbar'
import { Nav } from 'react-bootstrap'


const NavBar = () => {

  const history = useHistory()
  const location = useLocation()


  useEffect(() => {

  }, [location.pathname])

  const userIsAuthenticated = () => {
    const payload = getPayload()
    if (!payload) return false
    const now = Math.round(Date.now() / 1000) // get current time in milliseconds and convert to seconds to match token expiry time format
    return now < payload.exp // check if current time less than expiry time - returns a boolean
  }

  const handleLogout = () => {
    window.localStorage.removeItem('token') // remove token from local storage
    history.push('/') // redirect user to the home page
  }

  console.log(getUserIdFromLocalStorage())

  return (
    <>
      <Navbar expand='lg' bg='dark' variant='dark'>
        <Navbar.Brand href='/' className='mr-5' style={{ fontSize: '2rem' }}>The Potting Shed</Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>

          {userIsAuthenticated() ?
            <>
              <Nav className='mr-auto'>
                <Navbar.Brand style={{ fontSize: '1rem' }}>Welcome back, {getUsernameFromLocalStorage()}!</Navbar.Brand>
              </Nav>
              <Nav className='ml-auto'>
                <Nav.Link href='/community'>Community</Nav.Link>
                <Nav.Link href={`/profile/${getUserIdFromLocalStorage()}`}>MyProfile</Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </Nav>
            </>
            :
            <Nav className='ml-auto'>
              <Nav.Link href='/register'>Register</Nav.Link>
              <Nav.Link href='/login'>Login</Nav.Link>
            </Nav>
          }

        </Navbar.Collapse>
      </Navbar>
    </>
  )

}

export default NavBar