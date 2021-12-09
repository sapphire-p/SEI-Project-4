import React from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'

const PlantCard = (plant) => {

  return (
    <Card>
      <Link to={`/plants/${plant.id}`}>
        <Card.Img variant="top" src={plant.image} alt={plant.name} />
      </Link>
      <Card.Body>
        <Card.Title className="text-center" style={{ fontSize: '1.1rem' }}>{plant.name}</Card.Title>
        <Card.Text className="text-center">
          £{plant.price_in_GBP}
        </Card.Text>
      </Card.Body>
    </Card>
  )

}

export default PlantCard