import {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import {Link} from "react-router"
import { authContext } from '../../context/AuthContext'
import { getAllReservations } from '../../service/reservationService'
import {getOneStadium} from '../../service/stadiumService'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {CardBody, Container} from "react-bootstrap";
import Badge from 'react-bootstrap/Badge';


function ListReservation() {
    const [reservations,setReservations] = useState([]) 

    const {user} = useContext(authContext)
    console.log(user._id)

    async function getReservation(){
        try{
            
            const fetchedReservations = await getAllReservations()
            console.log(fetchedReservations)
            setReservations(fetchedReservations)
            // stadium=getOneStadium(reservations.stadium._id)

            // (reservations.stadium).map((oneStadium) => {
            //     return console.log('i am the one '+oneStadium.name)
            // })
            // console.log(reservations.stadium +' i am the stadium d')

            // console.log(stadium +' i am the stadium id')
        

        }
        catch(error){
            console.log(error)
        }

    }


    useEffect(()=>{
        getReservation()
    },[])

    return (
    <Container style={{padding:'70px'}}>
    <Row xs={1} md={3} className="g-4">
            {reservations.map((oneReservation)=>
            <Col key={oneReservation._id}>
                <Card className="h-100">
                <Card.Body>
                    
                    <div className="d-flex justify-content-between align-items-start">
                    <Card.Title className="mb-1 fw-bold" ><Link  className="text-dark text-decoration-none" style={{fontSize:'30px'}} to={`/stadium/${oneReservation.stadium._id}` }>{oneReservation.stadium.name}</Link></Card.Title>
                    </div>

                    <div className="d-flex justify-content-between align-items-start">
                    <Card.Title className="mb-1 fw-bold" >{oneReservation.reserveFrom} - {oneReservation.reserveTo}</Card.Title>
                    </div>

                    <div className="d-flex justify-content-between align-items-start">
                    <Card.Title className="mb-1 fw-bold" >{oneReservation.stadium.contactNo}</Card.Title>
                    </div>


                    </Card.Body>
                    </Card>
    
                    </Col>
            )}
            </Row>
            </Container>
)
}
export default ListReservation
