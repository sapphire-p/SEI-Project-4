import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { ImageUploadField } from './ImageUploadField'


const Register = () => {

  const history = useHistory()

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
    profile_image: '',
    three_word_bio: '',
    about_me: '',
  })

  const [errors, setErrors] = useState({
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

  const handleImageUrl = (url) => {
    setFormData({ ...formData, profile_image: url })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const newFormData = formData
    if (newFormData.profile_image === '') {
      delete newFormData.profile_image
    }
    if (newFormData.three_word_bio === '') {
      delete newFormData.three_word_bio
    }
    if (newFormData.about_me === '') {
      delete newFormData.about_me
    }
    try {
      await axios.post('/api/users/register/', newFormData)
      history.push('/login')
    } catch (err) {
      setErrors(err.response.data)
    }
  }


  return (
    <Container style={{ width: '80%', minWidth: '500px' }}>
      <div className='m-5'>
        <h1 className='mb-5'>Register</h1>
        <Form onSubmit={handleSubmit}>

          <Form.Group className='mb-3' controlId='formUsername'>
            <Form.Label className='font-weight-bold'>Username</Form.Label>
            <Form.Text className='text-muted pb-2'>
              Once registered, you will need your username and password to login
            </Form.Text>
            <Form.Control type='text' placeholder='Enter username' name='username' value={formData.username} onChange={handleChange} />
            <Form.Text className='text-danger'>
              {errors.username ? errors.username[0] : ''}
            </Form.Text>
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label className='font-weight-bold'>Email address</Form.Label>
            <Form.Control type='email' placeholder='Enter email' name='email' value={formData.email} onChange={handleChange} />
            <Form.Text className='text-danger'>
              {errors.email ? errors.email[0] : ''}
            </Form.Text>
          </Form.Group>

          <Form.Group className='mb-3' controlId='formPassword'>
            <Form.Label className='font-weight-bold'>Password</Form.Label>
            <Form.Control type='password' placeholder='Password' name='password' value={formData.password} onChange={handleChange} />
            <Form.Text className='text-danger'>
              {errors.password ? errors.password[0] : ''}
            </Form.Text>
          </Form.Group>

          <Form.Group className='mb-3' controlId='formPasswordConfirmation'>
            <Form.Label className='font-weight-bold'>Password Confirmation</Form.Label>
            <Form.Control type='password' placeholder='Password confirmation' name='password_confirmation' value={formData.password_confirmation} onChange={handleChange} />
            <Form.Text className='text-danger'>
              {errors.password_confirmation ? errors.password_confirmation[0] : ''}
            </Form.Text>
          </Form.Group>

          <Form.Group className='mb-3' controlId='formThreeWordBio'>
            <Form.Label className='font-weight-bold'>Three Word Bio</Form.Label>
            <Form.Control type='text' placeholder='Describe yourself in just three words!' name='three_word_bio' value={formData.three_word_bio} onChange={handleChange} />
            <Form.Text className='text-danger'>
              {errors.three_word_bio ? errors.three_word_bio[0] : ''}
            </Form.Text>
          </Form.Group>

          <Form.Group className='mb-3' controlId='formAboutMe'>
            <Form.Label className='font-weight-bold'>About Me</Form.Label>
            <Form.Text className='text-muted pb-2'>
              We&apos;d love to hear about your plant collection, hobbies, favourite plant...
            </Form.Text>
            <textarea className='form-control' id="exampleFormControlTextarea1" rows="4" type='text' placeholder='Tell us about yourself in a couple of sentences' name='about_me' value={formData.about_me} onChange={handleChange}></textarea>
            <Form.Text className='text-danger'>
              {errors.about_me ? errors.about_me[0] : ''}
            </Form.Text>
          </Form.Group>

          <Form.Group controlId='formFile' className='mb-3'>
            <Form.Label className='font-weight-bold'>Upload a profile image</Form.Label>
            <Form.Text className='text-muted pb-3'>
              Our uploader recognises faces, so a headshot works best. <br />
              If you don&apos;t upload a profile image, we&apos;ll give you a default one :)
            </Form.Text>
            <ImageUploadField
              value={formData.profile_image}
              name='profile_image'
              handleImageUrl={handleImageUrl}
            />
            <Form.Text className='text-danger'>
              {errors.profile_image ? errors.profile_image[0] : ''}
            </Form.Text>
          </Form.Group>

          <div className='d-flex justify-content-center'>
            <Button variant='primary' type='submit' className='mt-1 mb-3' style={{ width: '100%' }}>
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </Container >
  )
}

export default Register