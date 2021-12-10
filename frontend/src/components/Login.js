import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'


const Login = () => {

  const history = useHistory()

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  const [error, setError] = useState(false)


  const setTokenToLocalStorage = (token) => {
    window.localStorage.setItem('token', token)
  }
  const setUsernameToLocalStorage = (username) => {
    window.localStorage.setItem('username', username)
  }
  const setUserIdToLocalStorage = (userId) => {
    window.localStorage.setItem('user_id', userId)
  }

  const handleChange = (event) => {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    setFormData(newFormData)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const { data } = await axios.post('/api/users/login/', formData)
      setTokenToLocalStorage(data.token)
      setUsernameToLocalStorage(formData.username)
      setUserIdToLocalStorage(data.user_id)
      history.push('/')
    } catch (err) {
      setError(true)
    }
  }


  return (
    <>
      <div id='hero-auth' className="jumbotron jumbotron-fluid">
        <Container className="text-center">
          <h1 className="display-5 font-weight-bold">Login</h1>
          <p className="lead mt-4">
            Welcome! Enter your details below to log in <br />
            Not signed up yet? Click &apos;Register&apos; above to create your profile
          </p>
        </Container>
      </div>
      <Container style={{ width: '50%', minWidth: '490px', maxWidth: '650px' }}>
        <div className='m-5'>
          <Form onSubmit={handleSubmit}>

            <Form.Group className='mb-3' controlId='formUsername'>
              <Form.Label className='font-weight-bold'>Username</Form.Label>
              <Form.Control type='text' placeholder='Enter username' name='username' value={formData.username} onChange={handleChange} />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formPassword'>
              <Form.Label className='font-weight-bold'>Password</Form.Label>
              <Form.Control type='password' placeholder='Password' name='password' value={formData.password} onChange={handleChange} />
              {error && <Form.Text className='text-danger'>Invalid login credentials</Form.Text>}
            </Form.Group>

            <div className='d-flex justify-content-center'>
              <Button variant='primary' type='submit' className='bg-success mt-1 mb-3' style={{ width: '100%', borderStyle: 'none' }}>
                Login
              </Button>
            </div>
          </Form>
        </div>
      </Container >
    </>
  )

}

export default Login