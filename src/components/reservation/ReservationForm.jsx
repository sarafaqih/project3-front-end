import { useState, useContext, useEffect } from 'react';
import {useFetcher, useNavigate, useParams} from 'react-router'
import { authContext } from '../../context/AuthContext';
import {createReservation} from '../../service/reservationService'
import { getAllStadiums } from '../../service/stadiumService'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'

function ReservationForm() {
    const {user} = useContext(authContext)
    const {stadiumId} = useParams()

    const [stadium,setStadium] = useState([]) 

    const [formData, setFormData] = useState({
    reservedAt: Date.now(),
    username:user.username,
    stadium: stadiumId,
    reserveFrom:"",
    reserveTo:"",
    totallPrice:0,
    reservationDate: ''
    });

    
    const navigate = useNavigate()

    useEffect(() => {
      getStadiums()

    }, [stadiumId])

    useEffect(()=>{

      if (formData.reserveFrom && formData.reserveTo && stadium) {
      const [fromHours, fromMinutes] = formData.reserveFrom.split(':').map(Number);
      const [toHours, toMinutes] = formData.reserveTo.split(':').map(Number);

      // Convert both times to total minutes
      const fromTotalMinutes = fromHours * 60 + fromMinutes;
      const toTotalMinutes = toHours * 60 + toMinutes;

      // Difference in minutes
      let diffMinutes = toTotalMinutes - fromTotalMinutes;

      // Handle negative duration (if user picks a "to" time earlier than "from" time)
      if (diffMinutes < 0) {
        diffMinutes += 24 * 60; // assume it's the next day
      }

      // Convert to hours
      const diffInHours = diffMinutes / 60;
      
      console.log(diffInHours +" diff")
      if(formData.totallPrice !== (stadium.PricePerHour * diffInHours)){
        setFormData((prev) => ({ ...prev, totallPrice: (stadium.PricePerHour * diffInHours)}));
      }
    }
    },[formData.reserveFrom, formData.reserveTo, stadium])


    async function getStadiums(){
      try{
          
          const fetchedStadiums = await getAllStadiums()
          setStadium(fetchedStadiums)

          fetchedStadiums.map((onestadium) => {
          if(onestadium._id === stadiumId){
            setStadium(onestadium) 
        }
        })
      }
      catch(error){
          console.log(error)
      }

  }

    
    async function handleSubmit(e) {
      e.preventDefault();
      try{
        const token = localStorage.getItem("token")
  
            const createdReservation = await createReservation(stadiumId, formData)
      
              navigate("/stadium/reservations")
      }catch(err){
        console.log(err)
      }
    };
  
    function handleChange (e) {

      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  

    return (
      <div>
        <h1>Reserve {stadium.name}</h1>
        <br/>
        <form onSubmit={handleSubmit}>

        <InputGroup size="lg" className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-lg" htmlFor="reservationDate">Date</InputGroup.Text>
        <Form.Control
          aria-label="Large"
          aria-describedby="inputGroup-sizing-lg"
          type="Date"
          name='reservationDate'
          id='reservationDate'
          value={formData.reservationDate}
          onChange={handleChange}
          required
        />
      </InputGroup>

      <InputGroup size="lg" className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-lg" htmlFor="reserveFrom">Reserve From</InputGroup.Text>
        <Form.Control
          aria-label="Large"
          aria-describedby="inputGroup-sizing-lg"
          type="time"
          name='reserveFrom'
          id='reserveFrom'
          value={formData.reserveFrom}
          onChange={handleChange}
          required
        />
      </InputGroup>

      <InputGroup size="lg" className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-lg" htmlFor="reserveTo">Reserve To</InputGroup.Text>
        <Form.Control
          aria-label="Large"
          aria-describedby="inputGroup-sizing-lg"
          type="time"
          name='reserveTo'
          id='reserveTo'
          value={formData.reserveTo}
          onChange={handleChange}
          required
        />
      </InputGroup>

      <InputGroup size="lg" className="mb-3">
      <InputGroup.Text id="inputGroup-sizing-lg" htmlFor="totallPrice">Total Price</InputGroup.Text>
      <Form.Control
          value={formData.totallPrice +' BHD'} 
          disabled
        /> 

      </InputGroup>
  
          
          <button>Reserve</button>
        </form>
      </div>
    )
  }
  
export default ReservationForm
