import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Container, Row, Col } from 'react-bootstrap'
import Image from 'react-bootstrap/Image'

// import Card from 'react-bootstrap/Card'






const PlantShow = () => {

  const [plant, setPlant] = useState(null)
  const [reviews, setReviews] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`/api/plants/${id}`)
        console.log(data)
        console.log(data.review_set)
        setPlant(data)
        setReviews(data.review_set)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [id])


  console.log(plant)
  console.log(reviews)


  return (
    <>
      {
        plant && reviews ?
          <>
            <Container className='my-4'>
              <Row>
                <Col md={5} className='p-4'>
                  <Image src={plant.image} alt={plant.name} rounded fluid />
                </Col>
                <Col md={7} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <h2 className="text-center mt-3 mb-4">{plant.name}</h2>
                  <div className='px-4'>
                    <p>{plant.description}</p>
                    <p>Height (cm): {plant.height_in_cm}</p>
                    <p>Light level: {plant.light_level}</p>
                    <p>Watering: {plant.watering_frequency}</p>
                    <p>£{plant.price_in_GBP}</p>
                  </div>
                </Col>
              </Row>
            </Container>
            <Container>
              <h2 className="text-center">Reviews</h2>
              <Row>
                {reviews.length > 0 ?
                  <Col className='p-4'>
                    {reviews.map(review => {
                      return (
                        <div key={review.id}>
                          <h3>{review.review_owner.username}</h3>
                          <p>Rating: {review.rating}/5</p>
                        </div>
                      )
                    })}
                  </Col>
                  :
                  <Col className='p-4'>
                    <div>Loading... / Error</div>
                  </Col>
                }
              </Row>
            </Container >
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