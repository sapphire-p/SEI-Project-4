import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import PlantCard from './PlantCard'


const Home = () => {

  const [plants, setPlants] = useState(null)
  const [errors, setErrors] = useState(false)

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/plants')
        setPlants(data)
      } catch (err) {
        setErrors(true)
      }
    }
    getData()
  }, [])


  return (
    <>
      {plants ?
        <>
          <div id='hero' className="jumbotron jumbotron-fluid">
            <Container className="text-center">
              <h1 className="display-5 font-weight-bold">Welcome to The Potting Shed</h1>
              <p className="lead mt-4">
                Home of houseplants and pot plant people! <br />
                Shop for plants and join our green-fingered community
              </p>
            </Container>
          </div>
          <Container className='my-5' fluid>
            <Row lg='4' md='3' sm='2' style={{ marginLeft: '10vw', marginRight: '10vw' }}>
              {plants.map(plant => {
                return (
                  <div key={plant.id} style={{ padding: '1rem' }}>
                    <PlantCard {...plant} />
                  </div>
                )
              })}
            </Row>
          </Container>
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

export default Home