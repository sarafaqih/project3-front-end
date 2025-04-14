import { useState, useContext } from 'react';
import axios from 'axios'
import {useNavigate} from 'react-router'
import { createStadium } from '../../service/stadiumService'
import { authContext } from '../../context/AuthContext';

function StadiumForm() {
  const {user} = useContext(authContext)

  const [formData, setFormData] = useState({
    city:"",
    Governorates:"capital",
    name:"",
    openingTime:'',
    closingTime:'',
    Facilities:[],
    GoogleMaps:"",
    ContactNo:'',
    PricePerHour:'',
    StadiumNature:"outdoor",
    playerGender: "female",
    notes: "",
    addedAt:Date.now(),
    addedBy: user.username
});

const navigate = useNavigate()


  async function handleSubmit(e) {
    e.preventDefault();
    try{
      const token = localStorage.getItem("token")

          const createdStadium = await createStadium(formData)
    
            navigate("/stadium")
    }catch(err){
      console.log(err)
    }
  };

  function handleChange (e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  return (
    <Container style={{padding:'70px', width: '800px'}}>
    <Row xs={1} md={3} className="g-4">

          <Col md={12}>
              <Card className="h-100">
                <Card.Body>
    <div >
      <form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" >
      <Form.Label><label htmlFor='name'>Name : </label></Form.Label>
        <Form.Control

          required
          type='text'
          name='name'
          id='name'
          value={formData.name}
          onChange={handleChange}
        />
        </Form.Group>

        <Form.Group className="mb-3" >
        <label htmlFor='openingTime'>Opening Time : </label>
        <Form.Control aria-label="Time" type="time" id='openingTime' name='openingTime' value={formData.openingTime} onChange={handleChange}/>
        </Form.Group>


        <Form.Group className="mb-3" >
        <label htmlFor='closingTime'>Closing Time : </label>
        <Form.Control aria-label="Time" type="time" id='closingTime' name='closingTime' value={formData.closingTime} onChange={handleChange}/>
        </Form.Group>


        <Form.Group className="mb-3" >
        <label htmlFor='Facilities'>Facilities : </label>
        <Form.Control
                    as="select"
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
        </Form.Group>


        <Form.Group className="mb-3" >
        <label htmlFor='GoogleMaps'>Google Maps :</label>
        <Form.Control
          type='text'
          name='GoogleMaps'
          id='GoogleMaps'
          value={formData.GoogleMaps}
          onChange={handleChange}
        />
        </Form.Group>



<Form.Group className="mb-3" >
        <label htmlFor='ContactNo'>Contact Number : </label>
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
        </Form.Group>



<Form.Group className="mb-3" >
        <label htmlFor='PricePerHour'>Price Per Hour : </label>
        <Form.Control
          required
          type='number'
          name='PricePerHour'
          id='PricePerHour'
          min={0}
          value={formData.PricePerHour}
          onChange={handleChange}
        />
        </Form.Group>



        <Form.Group className="mb-3" >
        <label htmlFor='StadiumNature'>Stadium Nature : </label>
        <Form.Control
                    as="select"
          required
          name='StadiumNature'
          id='StadiumNature'
          value={formData.StadiumNature}
          onChange={handleChange}
        >
          <option value='outdoor' disabled>Choose Stadium Nature</option>
          <option value='outdoor'>Outdoor</option>
          <option value='indoor'>Indoor</option>
          </Form.Control>
        </Form.Group>



        <Form.Group className="mb-3" >
        <label htmlFor='playerGender'>Player Gender : </label>
        <Form.Control
                    as="select"
          required
          name='playerGender'
          id='playerGender'
          value={formData.playerGender}
          onChange={handleChange}
        >
          <option value='' disabled>Choose Player Gender</option>
          <option value='female'>Female</option>
          <option value='male'>Male</option>
          <option value='both'>Both</option>
          </Form.Control>
        </Form.Group>


        <Form.Group className="mb-3" >
        <label htmlFor='city-name'>City : </label>
        <Form.Control
          required
          type='text'
          name='city'
          id='city-name'
          value={formData.city}
          onChange={handleChange}
        />
        </Form.Group>



<Form.Group className="mb-3" >
        <label htmlFor='governorate-input'>Governorate : </label>
        <Form.Control
                    as="select"
          required
          name='Governorates'
          id='governorate-input'
          value={formData.Governorates}
          onChange={handleChange}
        >
          <option value='' disabled>Choose Governorate</option>
          <option value='capital'>Capital</option>
          <option value='muharraq'>Muharraq</option>
          <option value='northern'>Northern</option>
          <option value='southern'>Southern</option>
          </Form.Control>
        </Form.Group>




        <Form.Group className="mb-3" >
        <label htmlFor='notes'>Notes : </label>
        <Form.Control
                    as="textarea"
          type='text'
          name='notes'
          id='notes'
          value={formData.notes}
          onChange={handleChange}
        />
        </Form.Group>


        <button variant="primary" type="submit">SUBMIT</button>
      </form>
    </div>
                    </Card.Body>
    
    </Card>

</Col>

</Row>
</Container>
  )
}


export default StadiumForm;