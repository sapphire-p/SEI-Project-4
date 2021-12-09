import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'
import { Container, Row, Col } from 'react-bootstrap'
import Image from 'react-bootstrap/Image'
import PlantCard from './PlantCard'
import { getUserIdFromLocalStorage, getTokenFromLocalStorage } from './helpers/auth'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'



const Profile = () => {

  const { id } = useParams()
  const history = useHistory()

  const [user, setUser] = useState(null)
  const [mustHavePlants, setMustHavePlants] = useState(null)
  const [totalCost, setTotalCost] = useState(null)
  const [userLoggedIn, setUserLoggedIn] = useState(null)
  const [token, setToken] = useState()
  const [errors, setErrors] = useState(false)


  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`/api/users/${id}/`)
        setUser(data)
        setMustHavePlants(data.must_have_plants)
        setUserLoggedIn(getUserIdFromLocalStorage())
        setToken(getTokenFromLocalStorage())
      } catch (err) {
        setErrors(true)
      }
    }
    getData()
  }, [id])


  useEffect(() => {
    if (!mustHavePlants) {
      return
    } else {
      let total = 0
      mustHavePlants.map(plant => {
        total += parseFloat(plant.price_in_GBP)
      })
      setTotalCost(total.toFixed(2))
    }

  }, [mustHavePlants])


  const handleDeleteProfile = async () => {
    console.log('id of user ->', id)
    try {
      await axios.delete(
        `/api/users/${id}/`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      window.localStorage.removeItem('token') // remove token from local storage
      history.push('/') // redirect user to the home page
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <>
      {
        user && mustHavePlants ?
          <>
            <Container style={{ width: '80%', minWidth: '400px' }} className='my-4'>
              <Row>
                <Col md={5} className='d-flex justify-content-center py-4 px-3'>
                  <Image src={user.profile_image} alt={user.username} rounded fluid />
                </Col>
                <Col md={7} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <h1 className='text-center mt-3 mb-3'>{user.username}</h1>
                  <div className='px-3'>
                    <h4 className='mb-4' style={{ textAlign: 'center' }}>{user.three_word_bio}</h4>
                    <p>{user.about_me}</p>
                  </div>
                </Col>
              </Row>
            </Container>
            <Container style={{ width: '80%', minWidth: '400px', marginBottom: '50px' }}>
              <h2 className='text-center mb-3'>My Must-Have Plants</h2>
              <h5 className='mb-3' style={{ textAlign: 'center' }}>The plants on this site that I&apos;m loving right now...</h5>
              {userLoggedIn === id ?
                <>
                  {mustHavePlants.length > 0 ?
                    <>
                      <Container fluid>
                        <Row lg='3' md='3' sm='1' style={{ marginLeft: '5vw', marginRight: '5vw' }}>
                          {mustHavePlants.map(plant => {
                            return (
                              <div key={plant.id} style={{ padding: '1rem' }}>
                                <PlantCard {...plant} />
                              </div>
                            )
                          })}
                        </Row>
                      </Container>
                      <h5 className='mb-4' style={{ textAlign: 'center' }}>Total cost: £{totalCost}</h5>
                    </>
                    :
                    <div className='mb-3 d-flex flex-column align-items-center font-weight-bold text-success'>
                      <p style={{ margin: 0, textAlign: 'center' }}>Your basket is empty - no Must-Have Plants have been added :(</p>
                      <p style={{ margin: 0, textAlign: 'center' }}>Click the &apos;Add to Must-Have Plants&apos; button on a plant page to add it</p>
                    </div>
                  }
                  {userLoggedIn !== '1' ?
                    <div style={{ textAlign: 'center', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <Button onClick={handleDeleteProfile} variant='primary' type='submit' className='bg-danger mt-1 my-3' style={{ width: '50%', borderStyle: 'none' }}>
                        Delete My Profile<br />
                        Please note: this cannot be reversed
                      </Button>
                    </div>
                    :
                    <div></div>
                  }
                </>
                :
                <>
                  {mustHavePlants.length > 0 ?
                    <>
                      <Container fluid>
                        <Row lg='3' md='3' sm='1' style={{ marginLeft: '5vw', marginRight: '5vw' }}>
                          {mustHavePlants.map(plant => {
                            return (
                              <div key={plant.id} style={{ padding: '1rem' }}>
                                <Card>
                                  <Link to={`/plants/${plant.id}`}>
                                    <Card.Img variant="top" src={plant.image} alt={plant.name} />
                                  </Link>
                                  <Card.Body>
                                    <Card.Title style={{ margin: '0' }} className="text-center">{plant.name}</Card.Title>
                                  </Card.Body>
                                </Card>
                              </div>
                            )
                          })}
                        </Row>
                      </Container>
                    </>
                    :
                    <div className='d-flex flex-column align-items-center font-weight-bold text-success'>
                      <p style={{ margin: 0, textAlign: 'center' }}>{user.username} has not added any Must-Have Plants</p>
                    </div>
                  }
                </>
              }
            </Container >
          </>
          :
          <>
            {errors ?
              <Container className='my-5'>
                < Row >
                  <Col>
                    <h1 style={{ fontSize: '1.6rem' }} className="text-center mb-4 mt-2">Oops! Something went wrong... <br /> Please refresh the page or try another link</h1>
                  </Col>
                </Row>
              </Container >
              :
              <Container className='my-4'>
                <Row>
                  <Col>
                    <h1 style={{ fontSize: '1.6rem' }} className="text-center mb-4 mt-2">Loading...</h1>
                  </Col>
                </Row>
              </Container>
            }
          </>
      }
    </>
  )
}

export default Profile