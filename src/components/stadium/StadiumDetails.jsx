import {useState,useEffect, useContext} from 'react'
import {useParams, useNavigate} from 'react-router'
import { authContext } from '../../context/AuthContext'
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {Container} from "react-bootstrap";
import Badge from 'react-bootstrap/Badge';
import {Link} from "react-router"
import { deleteStadium } from '../../service/stadiumService'



function StadiumDetails() {
    const [stadium,setStadium] = useState(null)
    const {user} = useContext(authContext)


    const navigate = useNavigate()

    // step 1: get Id from the parameter
    const {stadiumId} = useParams()

    async function getStadium(){
        try{
            const token = localStorage.getItem("token")
            const fetchedStadium = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/stadium/${stadiumId}`,{headers:{Authorization:`Bearer ${token}`}})

            setStadium(fetchedStadium.data)
            console.log(fetchedStadium.data)

        }catch(err){
            console.log(err)
        }
    }

        async function deleteOneStadium(stadiumId){
      
          await deleteStadium(stadiumId)

          navigate("/stadium")
          
        }
    

    useEffect(()=>{
        getStadium()
    },[])

  return (

    <Container style={{padding:'70px'}}>
      {stadium && (
    <Row xs={1} md={1} className="g-1">
          <Col >
              <Card className="h-100">
                <Card.Body>

                <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <Card.Title className="mb-0">Stadium Name</Card.Title>
                </div>
                <div>
                  <Card.Title className="mb-0">{stadium.name}</Card.Title>
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <Card.Title className="mb-0">City</Card.Title>
                </div>
                <div>
                  <Card.Title className="mb-0">{stadium.city}</Card.Title>
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <Card.Title className="mb-0">Governorate</Card.Title>
                </div>
                <div>
                  <Card.Title className="mb-0">{stadium.Governorates}</Card.Title>
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <Card.Title className="mb-0">Opening Time</Card.Title>
                </div>
                <div>
                  <Card.Text className="mb-0">{stadium.openingTime} - {stadium.closingTime}</Card.Text>
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <Card.Title className="mb-0">Facilities</Card.Title>
                </div>
                <div>
                  <Card.Text className="mb-0">{stadium.Facilities}</Card.Text>
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <Card.Title className="mb-0">Google Maps</Card.Title>
                </div>
                <div>
                  <Card.Text className="mb-0"> <a href={stadium.GoogleMaps} target="_blank" rel="noopener noreferrer">
    <button className="btn btn-primary">Directions</button>
  </a></Card.Text>
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <Card.Title className="mb-0">Contact Number</Card.Title>
                </div>
                <div>
                  <Card.Text className="mb-0">{stadium.ContactNo}</Card.Text>
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <Card.Title className="mb-0">Price Per Hour</Card.Title>
                </div>
                <div>
                  <Card.Text className="mb-0">{stadium.PricePerHour} BHD</Card.Text>
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <Card.Title className="mb-0">StadiumNature</Card.Title>
                </div>
                <div>
                  <Card.Text className="mb-0">{stadium.StadiumNature}</Card.Text>
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <Card.Title className="mb-0">Players Gender</Card.Title>
                </div>
                <div>
                  <Card.Text className="mb-0">{stadium.playerGender}</Card.Text>
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <Card.Title className="mb-0">Notes</Card.Title>
                </div>
                <div>
                  <Card.Text className="mb-0">- {stadium.notes}</Card.Text>
                </div>
              </div>

                {user.role === 'admin' ? (
                  <>
                <div className="d-flex justify-content-between align-items-center mb-3">

                <div>
                <Card.Title className="mb-0">Added at</Card.Title>
              </div>
                <div>
                  <Card.Text className="mb-0">{`${new Date(stadium.addedAt).getFullYear()}-${String(new Date(stadium.addedAt).getMonth() + 1).padStart(2, '0')}-${String(new Date(stadium.addedAt).getDate()).padStart(2, '0')} ${String(new Date(stadium.addedAt).getHours()).padStart(2, '0')}:${String(new Date(stadium.addedAt).getMinutes()).padStart(2, '0')}`}
                  </Card.Text>
                </div>
              </div>

            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <Card.Title className="mb-0">Added by</Card.Title>
              </div>
              <div>
                <Card.Text className="mb-0">{stadium.addedBy.username}</Card.Text>
              </div>
            </div>
</>
                ): <p></p>}
                </Card.Body>
                  <Card.Footer>
                  {stadium.addedBy.role === 'admin' ? (
                    <>
                    <Link to={`/stadium/${stadiumId}/update`}><button>Update Stadium</button></Link>
                    <button onClick={()=>{deleteOneStadium(stadiumId)}}>Delete Stadium</button>
                    </>
        
                    ): stadium.addedBy.role === 'customer' && (
                      <>

                      <Link to={`/stadium/${stadiumId}/reservation`}><button>Reserve Stadium</button></Link>
                      </>
                    )
                  }
                  </Card.Footer>    
                   </Card>

                </Col>
        </Row>
      )}
        </Container>
  )
}

export default StadiumDetails