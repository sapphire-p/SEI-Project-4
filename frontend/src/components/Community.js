import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import axios from 'axios'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'


const Community = () => {

  const [users, setUsers] = useState(null)

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/users')
        setUsers(data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])

  return (
    <>
      {users ?
        <>
          <div id='hero' className="jumbotron jumbotron-fluid">
            <Container className="text-center">
              <h1 className="display-5 font-weight-bold">Community</h1>
              <p className="lead mt-4">
                Meet like-minded members of The Potting Shed community. <br />
                Browse profiles and get inspiration for your next pot plant purchase!
              </p>
            </Container>
          </div>
          <Container>
            <div id="custom-card-columns" className="card-columns">
              {users.map(user => {
                return (
                  <div key={user.id}>
                    <Card style={{ borderStyle: 'none' }} >
                      <Link to={`/profile/${user.id}`}>
                        <Card.Img variant="top" src={user.profile_image} alt={user.username} />
                      </Link>
                      <Card.Body>
                        <Card.Title className="text-center mb-1">{user.username}</Card.Title>
                        <Card.Text className="text-center">
                          {user.three_word_bio}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                )
              })}
            </div>
          </Container>
        </>
        :
        <div>Loading... / Error</div>
      }
    </>
  )

}

export default Community


// Card.Img:
// variant="top"

{/* <Link to={`/profile/${user.id}`}>
<div style={{ height: '200px', width: '200px' }} className='d-flex flex-row align-items-center'>
  <Card.Img style={{ height: '100%' }} variant="top" src={user.profile_image} alt={user.username} />
</div>
</Link> */}