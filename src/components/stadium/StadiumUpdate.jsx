import {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import {useNavigate, useParams} from 'react-router'
import { authContext } from '../../context/AuthContext';
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {Container} from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'


function StadiumUpdate() {
  const {user} = useContext(authContext)


  const [formData,setFormData] = useState({
    city:"",
    Governorates:"capital",
    name:"",
    openingTime:'',
    closingTime:'',
    Facilities:"prayer-room",
    GoogleMaps:"",
    ContactNo:'',
    PricePerHour:'',
    StadiumNature:"outdoor",
    playerGender: "female",
    notes: "",
    addedAt:Date.now(),
    addedBy: user.username
})

const navigate = useNavigate()

const {stadiumId} = useParams()

function handleChange(e){
  setFormData({...formData,[e.target.name]:e.target.value})
}

async function handleSubmit(e){
  e.preventDefault()

  try{
      const token = localStorage.getItem("token")

      const createdStadium = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/stadium/${stadiumId}`,formData,{headers:{Authorization:`Bearer ${token}`}})
      navigate("/stadium")
  }
  catch(err){
      console.log(err)
  }

}

async function getStadium(){
  const token = localStorage.getItem("token")

  const foundStadium = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/stadium/${stadiumId}`,{headers:{Authorization:`Bearer ${token}`}})
  setFormData(foundStadium.data)
  console.log(foundStadium.data)

}

useEffect(()=>{
  getStadium()
},[])

  return (
    <Container style={{padding:'70px', width: '800px'}}>
    <Row xs={1} md={3} className="g-4">
          <Col md={12}>
              <Card className="h-100">
                <Card.Body>
    <div>
      <form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" >

      <Form.Label><label htmlFor='name'>Name</label></Form.Label>
        <Form.Control

          required
          type='text'
          name='name'
          id='name'
          value={formData.name}
          onChange={handleChange}
        />
                </Form.Group>


                <Form.Label><label htmlFor='openingTime'>Opening Time</label></Form.Label>
        <Form.Control
 aria-label="Time" type="time" id='openingTime' name='openingTime' value={formData.openingTime} onChange={handleChange}/>

        <Form.Label><label htmlFor='closingTime'>Closing Time</label></Form.Label>
        <Form.Control
 aria-label="Time" type="time" id='closingTime' name='closingTime' value={formData.closingTime} onChange={handleChange}/>

        <Form.Label><label htmlFor='Facilities'>Facilities</label></Form.Label>
        <Form.Control
                    as='select'
          name='Facilities'
          id='Facilities'
          value={formData.Facilities}
          onChange={handleChange}
        >
          <option value='prayer-room'>Prayer Room</option>
          <option value='toilets'>Toilets</option>
          <option value='shower'>Shower</option>
          <option value='locker-area'>Locker Area</option>
          <option value='coffee-shop'>Coffee Shop</option>
          <option value='free-ball'>Free Ball</option>
          <option value='water'>Water</option>
        </Form.Control>

        <Form.Label><label htmlFor='GoogleMaps'>Google Maps</label></Form.Label>
        <Form.Control

          type='text'
          name='GoogleMaps'
          id='GoogleMaps'
          value={formData.GoogleMaps}
          onChange={handleChange}
        />

       <Form.Label><label htmlFor='ContactNo'>Contact Number</label></Form.Label>
        <Form.Control

          required
          type='number'
          name='ContactNo'
          id='ContactNo'
          min='11111111'
          max='99999999'
          value={formData.ContactNo}
          onChange={handleChange}
        />

       <Form.Label><label htmlFor='PricePerHour'>Price Per Hour</label></Form.Label>
        <Form.Control

          required
          type='number'
          name='PricePerHour'
          id='PricePerHour'
          min={0}
          value={formData.PricePerHour}
          onChange={handleChange}
        />

        <Form.Label><label htmlFor='StadiumNature'>Stadium Nature</label></Form.Label>
        <Form.Control
                    as='select'
          required
          name='StadiumNature'
          id='StadiumNature'
          value={formData.StadiumNature}
          onChange={handleChange}
        >
          <option value='outdoor'>Outdoor</option>
          <option value='indoor'>Indoor</option>
        </Form.Control>

        <Form.Label><label htmlFor='playerGender'>Player Gender</label></Form.Label>
        <Form.Control
                    as='select'
          required
          name='playerGender'
          id='playerGender'
          value={formData.playerGender}
          onChange={handleChange}
        >
          <option value='female'>Female</option>
          <option value='male'>Male</option>
          <option value='both'>Both</option>
        </Form.Control>


        <Form.Label><label htmlFor='city-name'>City</label></Form.Label>
        <Form.Control

          required
          type='text'
          name='city'
          id='city-name'
          value={formData.city}
          onChange={handleChange}
        />
        <Form.Label><label htmlFor='governorate-Form.Control
 '>Governorate</label></Form.Label>
        <Form.Control
                    as='select'
          required
          name='Governorates'
          id='governorate-Form.Control
          '
          value={formData.Governorates}
          onChange={handleChange}
        >
          <option value='capital'>Capital</option>
          <option value='muharraq'>Muharraq</option>
          <option value='northern'>Northern</option>
          <option value='southern'>Southern</option>
        </Form.Control>

        <Form.Label><label htmlFor='notes'>Notes</label></Form.Label>
        <Form.Control
                    as='textarea'
          type='text'
          name='notes'
          id='notes'
          value={formData.notes}
          onChange={handleChange}
        />


    <button variant='primary' type='submit'>SUBMIT</button>
      </form>
      
    </div>
    </Card.Body>
    </Card>
</Col>
</Row>
</Container>
  )
}

export default StadiumUpdate
