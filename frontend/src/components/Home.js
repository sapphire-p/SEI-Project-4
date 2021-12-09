import React, { useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import axios from 'axios'
import PlantCard from './PlantCard'


const Home = () => {

  const [plants, setPlants] = useState(null)

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/plants')
        setPlants(data)
      } catch (err) {
        console.log(err)
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
          <Container className='mt-5' fluid>
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
        <div>Loading... / Error</div>
      }
    </>
  )

}

export default Home



/* <Row xs={1} sm={1} md={3} lg={4} xl={4}>
  {plants.map(plant => {
    return (
      <Col key={plant.id} className="text-center">
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the bulk of
              the cards content.
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    )
  })}
</Row> */


// price={plant.price_in_GBP}