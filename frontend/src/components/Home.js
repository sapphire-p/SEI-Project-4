import React, { useEffect, useState } from 'react'
// import Jumbotron from 'react-bootstrap/Jumbotron'
import Card from 'react-bootstrap/Card'
// import CardColumns from 'react-bootstrap/CardColumns'
import { Container } from 'react-bootstrap'
import axios from 'axios'


const Home = () => {

  const [plants, setPlants] = useState(null)

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/plants')
        console.log(data)
        setPlants(data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])

  console.log(plants)

  return (
    // <Jumbotron fluid>
    <>
      {plants ?
        <>
          <div className="jumbotron jumbotron-fluid">
            <Container className="text-center">
              <h1 className="display-5 font-weight-bold">Welcome to The Potting Shed</h1>
              <p className="lead mt-4">
                Home of houseplants and pot plant people! <br />
                Shop for plants and join our green-fingered community
              </p>
            </Container>
          </div>
          <Container>
            <div id="custom-card-columns" className="card-columns">
              {plants.map(plant => {
                return (
                  <Card key={plant.id}>
                    <Card.Img variant="top" src={plant.image} alt={plant.name} />
                    <Card.Body>
                      <Card.Title className="blue-title text-center">{plant.name}</Card.Title>
                      <Card.Text className="text-center">
                        £{plant.price_in_GBP}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                )
              })}
              <Card>
                <Card.Img variant="top" src="holder.js/100px160" />
                <Card.Body>
                  <Card.Title>Card title that wraps to a new line</Card.Title>
                  <Card.Text>
                    This is a longer card with supporting text below as a natural lead-in to
                    additional content. This content is a little bit longer.
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
            {/* <Row xs={1} sm={1} md={3} lg={4} xl={4}>
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
            </Row> */}
          </Container>
        </>
        :
        <div>Loading... / Error</div>
      }
    </>
    // </Jumbotron>
  )

}

export default Home