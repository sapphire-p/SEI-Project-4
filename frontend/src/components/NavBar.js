import React, { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { getPayload, getUsernameFromLocalStorage, getUserIdFromLocalStorage } from './helpers/auth'
import Navbar from 'react-bootstrap/Navbar'
import { Nav } from 'react-bootstrap'
// import Image from 'react-bootstrap/Image'


const NavBar = () => {

  const history = useHistory()
  const location = useLocation()


  useEffect(() => {

  }, [location.pathname]) // triggers a rerender when user's location pathname (URL pathname) changes


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

  // console.log(getUserIdFromLocalStorage())


  return (
    <>
      <Navbar style={{ backgroundColor: '#151515' }} expand='lg' variant='dark'>
        <Navbar.Brand href='/' className='mr-5' style={{ fontSize: '2rem' }}>
          <div className='d-flex flex-row align-items-center'>
            <img style={{ margin: '0 10px' }} width='60' src='https://res.cloudinary.com/dfgnpqkiv/image/upload/v1638954811/The-Potting-Shed/The-Potting-Shed_logo_gh5mqn.png' />
            <h1 style={{ margin: '0 auto', fontSize: '2rem' }}>The Potting Shed</h1>
          </div>
        </Navbar.Brand>
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