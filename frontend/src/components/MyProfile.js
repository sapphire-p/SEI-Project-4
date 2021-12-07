import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Container, Row, Col } from 'react-bootstrap'
import Image from 'react-bootstrap/Image'


const MyProfile = () => {

  const { id } = useParams()
  const [user, setUser] = useState(null)
  const [mustHavePlants, setMustHavePlants] = useState(null)


  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`/api/users/${id}/`)
        setUser(data)
        setMustHavePlants(data.must_have_plants)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [id])


  // console.log(user)
  console.log(mustHavePlants)



  return (
    <>
      {
        user ?
          <>
            <Container className='my-4'>
              <Row>
                <Col md={5} className='d-flex justify-content-center p-4'>
                  <Image src={user.profile_image} alt={user.username} rounded fluid />
                </Col>
                <Col md={7} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <h1 className='text-center mt-3 mb-3'>{user.username}</h1>
                  <div className='px-4'>
                    <h4 className='mb-4' style={{ textAlign: 'center' }}>{user.three_word_bio}</h4>
                    <p>{user.about_me}</p>
                  </div>
                </Col>
              </Row>
            </Container>
            <Container>
              <h2 className="text-center">My Must-Have Plants</h2>
            </Container >
          </>
          :
          <div>Loading... / Error</div>
      }
    </>
  )

}

export default MyProfile