import React, { useState } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import { Nav } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'


const NavBar = () => {

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)


  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
    profile_image: '',
    three_word_bio: '',
    about_me: '',
  })

  const handleChange = (event) => {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    setFormData(newFormData)
  }

  console.log(formData)


  return (
    <>
      <Navbar expand='lg' bg='dark' variant='dark'>
        <Navbar.Brand href='/'>The Potting Shed</Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='mr-auto'>
            <Nav.Link href='/community'>Community</Nav.Link>
            <Nav.Link href='/myprofile'>Profile</Nav.Link>
          </Nav>
          <Nav className='ml-auto'>
            {/* <Nav.Link href='/register'>Register</Nav.Link> */}
            <Button variant='primary' onClick={handleShow}>
              Register
            </Button>
            <Nav.Link href='/login'>Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* <Button variant='primary' onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Register as a new user</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          Woohoo, youre reading this text in a modal!
          <Form>

            <Form.Group className='mb-3' controlId='formUsername'>
              <Form.Label>Username</Form.Label>
              <Form.Text className='text-muted'>
                You will need your username and password to login once registered
              </Form.Text>
              <Form.Control type='text' placeholder='Enter username' name='username' value={formData.username} onChange={handleChange} />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Email address</Form.Label>
              <Form.Control type='email' placeholder='Enter email' name='email' value={formData.email} onChange={handleChange} />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' placeholder='Password' name='password' value={formData.password} onChange={handleChange} />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formPasswordConfirmation'>
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type='password' placeholder='Password confirmation' name='password_confirmation' value={formData.password_confirmation} onChange={handleChange} />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formThreeWordBio'>
              <Form.Label>Three Word Bio</Form.Label>
              <Form.Control type='text' placeholder='Describe yourself in just three words!' name='three_word_bio' value={formData.three_word_bio} onChange={handleChange} />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formAboutMe'>
              <Form.Label>About Me</Form.Label>
              <Form.Control type='text' placeholder='Tell us about yourself in a couple of sentences' name='about_me' value={formData.about_me} onChange={handleChange} />
              <Form.Text className='text-muted'>
                We&apos;d love to hear about your plant collection, hobbies, favourite plant...
              </Form.Text>
            </Form.Group>

            <Button variant='primary' type='submit'>
              Submit
            </Button>
          </Form>

        </Modal.Body>

        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )

}

export default NavBar