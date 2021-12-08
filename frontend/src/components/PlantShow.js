import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getPayload, getUserIdFromLocalStorage, getTokenFromLocalStorage } from './helpers/auth'
import axios from 'axios'
import { Container, Row, Col } from 'react-bootstrap'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'


const PlantShow = () => {

  const [plant, setPlant] = useState(null)
  const [reviews, setReviews] = useState(null)
  const [loggedInUserId, setLoggedInUserId] = useState(null)
  const [token, setToken] = useState()
  const { id } = useParams()
  const [getRequestErrors, setGetRequestErrors] = useState(false)
  const [putRequestErrors, setPutRequestErrors] = useState(false)
  const [mustHavesButtonClicked, setMustHavesButtonClicked] = useState(false)
  const [reviewPostedDataResponse, setReviewPostedDataResponse] = useState(false)
  const [numberOfReviewsDeleted, setNumberOfReviewsDeleted] = useState(0)

  const userIsAuthenticated = () => {
    const payload = getPayload()
    if (!payload) return false
    const now = Math.round(Date.now() / 1000)
    return now < payload.exp
  }


  const [reviewFormData, setReviewFormData] = useState({
    rating: '',
    comment: '',
    plant: id,
  })

  const [reviewPostRequestErrors, setReviewPostRequestErrors] = useState({
    rating: '',
    comment: '',
  })


  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`/api/plants/${id}`)
        setPlant(data)
        setReviews(data.review_set)
      } catch (err) {
        console.log(err)
        setGetRequestErrors(true)
      }
    }
    getData()
  }, [id, reviewPostedDataResponse, numberOfReviewsDeleted])


  useEffect(() => {
    setLoggedInUserId(getUserIdFromLocalStorage())
    setToken(getTokenFromLocalStorage())
  }, [])


  const handleMustHave = async () => {
    try {
      await axios.put(
        `/api/users/${loggedInUserId}/`,
        { plant_id: id }, // id here refers to plant id, taken from the params
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setMustHavesButtonClicked(true)
    } catch (err) {
      setPutRequestErrors(true)
    }
  }

  const handleNotLoggedInClickedMustHave = () => {
    setMustHavesButtonClicked(true)
  }


  const handleChange = (event) => {
    const newReviewFormData = { ...reviewFormData, [event.target.name]: event.target.value }
    setReviewFormData(newReviewFormData)
  }

  const handleReviewSubmit = async (event) => {
    event.preventDefault()
    try {
      const { data } = await axios.post(
        '/api/reviews/',
        reviewFormData,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setReviewPostedDataResponse(data)
    } catch (err) {
      console.log(err)
      setReviewPostRequestErrors(err.response.data)
    }
  }

  const handleDeleteReview = async (reviewId) => {
    console.log('reviewId ->', reviewId)
    try {
      await axios.delete(
        `/api/reviews/${reviewId}/`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setNumberOfReviewsDeleted(numberOfReviewsDeleted + 1)
    } catch (err) {
      console.log(err)
    }
  }

  // console.log('plant.id ->', plant.id)
  // console.log(reviews)
  // console.log('loggedInUserId ->', loggedInUserId)
  // console.log('token ->', token)
  // console.log('mustHavesButtonClicked ->', mustHavesButtonClicked)

  // console.log('reviewPostRequestErrors ->', reviewPostRequestErrors)
  // console.log('reviewFormData ->', reviewFormData)
  // console.log('reviewPostedDataResponse ->', reviewPostedDataResponse)
  console.log('numberOfReviewsDeleted ->', numberOfReviewsDeleted)

  console.log('getRequestErrors ->', getRequestErrors)
  console.log('putRequestErrors ->', putRequestErrors)

  return (
    <>
      {
        plant && reviews ?
          <>
            <Container className='my-4'>
              <Row>
                <Col md={5} className='d-flex align-items-center p-4'>
                  <Image src={plant.image} alt={plant.name} rounded fluid />
                </Col>
                <Col md={7} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <h2 className='text-center mt-3 mb-4'>{plant.name}</h2>
                  <div className='px-4'>
                    <p>{plant.description}</p>
                    <p><span className='font-weight-bold'>Height (cm):</span> {plant.height_in_cm}</p>
                    <p><span className='font-weight-bold'>Light level:</span> {plant.light_level}</p>
                    <p><span className='font-weight-bold'>Watering:</span> {plant.watering_frequency}</p>
                    <p>£{plant.price_in_GBP}</p>
                    <div className='d-flex justify-content-center'>
                      {userIsAuthenticated() ?
                        <>
                          {!mustHavesButtonClicked ?
                            <Button onClick={handleMustHave} variant='primary' type='button' className='mt-1 mb-3' style={{ width: '100%' }}>
                              Add to Must-Have Plants
                            </Button>
                            :
                            <p className='font-weight-bold text-success'>Plant added to Must-Haves list!</p>
                          }
                        </>
                        :
                        <>
                          {!mustHavesButtonClicked ?
                            <Button onClick={handleNotLoggedInClickedMustHave} variant='primary' type='button' className='mt-1 mb-3' style={{ width: '100%' }}>
                              Add to Must-Have Plants
                            </Button>
                            :
                            <div className='d-flex flex-column align-items-center font-weight-bold text-success'>
                              <p style={{ margin: 0, textAlign: 'center' }}>You must be logged in to access this feature.</p>
                              <p style={{ margin: 0, textAlign: 'center' }}>Please Register or Login via the links above ^^</p>
                            </div>
                          }
                        </>
                      }
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
            <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h2 className="text-center mb-4">Reviews</h2>
              {reviews.length > 0 ?
                <>
                  {reviews.map(review => {
                    return (
                      <div key={review.id} style={{ margin: '0 5vw', width: '60%' }}>
                        <Row>
                          <Col md={7}>
                            <p className='font-weight-bold'>{review.review_owner.username}</p>
                          </Col>
                          <Col md={4}>
                            <p className='font-weight-bold'>Rating: {review.rating}/5</p>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <div>{review.comment}<br />
                              <>
                                {parseInt(loggedInUserId) === review.review_owner.id ?
                                  <button id='delete-review-button' onClick={() => handleDeleteReview(review.id)} style={{ marginBottom: '1.8rem' }}>Delete review</button>
                                  :
                                  <div style={{ marginBottom: '1.8rem' }}></div>
                                }
                              </>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    )
                  })}
                </>
                :
                <Col className='p-4'>
                  <div className='text-center'>There are no reviews available for this plant.</div>
                </Col>
              }
            </Container >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '50px' }}>
              {userIsAuthenticated() ?
                <>
                  <h3 className="text-center mb-4 mt-2">Leave a review</h3>
                  <div style={{ width: '50%' }}>
                    <Form onSubmit={handleReviewSubmit}>

                      <Form.Group className='mb-3' controlId='formUsername'>
                        <Form.Label className='font-weight-bold'>Rating (out of 5)</Form.Label>
                        <Form.Control style={{ width: '70px' }} type='number' name='rating' value={reviewFormData.rating} onChange={handleChange} />
                        <Form.Text className='text-danger'>
                          {reviewPostRequestErrors.rating ? reviewPostRequestErrors.rating[0] : ''}
                        </Form.Text>
                      </Form.Group>

                      <Form.Group className='mb-3' controlId='formPassword'>
                        <Form.Label className='font-weight-bold'>Comment</Form.Label>
                        <Form.Control type='text' placeholder='Write comment here' name='comment' value={reviewFormData.comment} onChange={handleChange} />
                        <Form.Text className='text-danger'>
                          {reviewPostRequestErrors.comment ? reviewPostRequestErrors.comment[0] : ''}
                        </Form.Text>
                      </Form.Group>

                      <div className='d-flex justify-content-center'>
                        <Button variant='primary' type='submit' className='mt-1 mb-3' style={{ width: '100%' }}>
                          Submit Review
                        </Button>
                      </div>
                    </Form>
                  </div>
                </>
                :
                <div></div>
              }
            </div>
          </>
          :
          <div>Loading... / Error</div>
      }
    </>
  )

}

export default PlantShow



{/* <Container>
<h2 className="text-center">Reviews</h2>
<Row>
  <Col>
    <Image src={plant.image} rounded fluid />
  </Col>
  <Col>
    <h2 className="text-center">{plant.name}</h2>
    <p>{plant.description}</p>
    <p>Height (cm): {plant.height_in_cm}</p>
    <p>Light level: {plant.light_level}</p>
    <p>Watering: {plant.watering_frequency}</p>
    <p>Price: £{plant.price_in_GBP}</p>
  </Col>
</Row>
</Container > */}

// className='d-flex flex-column justify-content-center align-items-center'