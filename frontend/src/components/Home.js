import React from 'react'
// import Jumbotron from 'react-bootstrap/Jumbotron'
import { Container } from 'react-bootstrap'


const Home = () => {

  return (
    // <Jumbotron fluid>
    <div className="jumbotron jumbotron-fluid">
      <Container className="text-center">
        <h1 className="display-5 font-weight-bold">Welcome to The Potting Shed</h1>
        <p className="lead mt-4">
          Home of houseplants and pot plant people! <br />
          Shop for plants and join our green-fingered community
        </p>
      </Container>
    </div>
    // </Jumbotron>
  )

}

export default Home