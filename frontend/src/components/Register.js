import React, { useState } from 'react'
// import axios from 'axios'
// import { useHistory } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { ImageUploadField } from './ImageUploadField'


const Register = () => {



  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
    profile_image: 'https://res.cloudinary.com/dfgnpqkiv/image/upload/c_fill,h_300,r_max,w_300/v1638451738/The-Potting-Shed/robin-mathlener-8x3wjKJL_yE-unsplash_edit_eadnep.jpg',
    three_word_bio: 'Hi there everyone!',
    about_me: '',
  })

  const handleChange = (event) => {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    setFormData(newFormData)
  }

  const handleImageUrl = (url) => {
    setFormData({ ...formData, profile_image: url })
  }

  console.log(formData)

  return (
    <Container>
      <div className='m-5'>
        <h1 className='m-5'>Register</h1>
        <Form className='m-5'>

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
            <Form.Control style={{ height: '100px' }} type='text' placeholder='Tell us about yourself in a couple of sentences' name='about_me' value={formData.about_me} onChange={handleChange} />
            <Form.Text className='text-muted'>
              We&apos;d love to hear about your plant collection, hobbies, favourite plant...
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Upload a profile image</Form.Label>
            {/* <Form.Control type="file" /> */}
            <ImageUploadField
              value={formData.profile_image}
              name='profile_image'
              handleImageUrl={handleImageUrl}
            />
          </Form.Group>

          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </Form>
      </div>
    </Container>
  )

}

export default Register