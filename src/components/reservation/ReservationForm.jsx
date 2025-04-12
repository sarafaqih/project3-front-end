import { useState, useContext, useEffect } from 'react';
import {useFetcher, useNavigate, useParams} from 'react-router'
import { authContext } from '../../context/AuthContext';
import {createReservation} from '../../service/reservationService'
import { getAllStadiums } from '../../service/stadiumService'

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
      
              navigate("/stadium")
      }catch(err){
        console.log(err)
      }
    };
  
    function handleChange (e) {

      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  

    return (
      <div>
        <form onSubmit={handleSubmit}>

        <label htmlFor='reservationDate'>Date</label>
          <input type="Date" id='reservationDate' name='reservationDate' value={formData.reservationDate} onChange={handleChange}/>

  
          <label htmlFor='reserveFrom'>Reserve From</label>
          <input aria-label="Time" type="time" id='reserveFrom' name='reserveFrom' value={formData.reserveFrom} onChange={handleChange}/>
  
          <label htmlFor='reserveTo'>Reserve To</label>
          <input aria-label="Time" type="time" id='reserveTo' name='reserveTo' value={formData.reserveTo} onChange={handleChange}/>
  
          <label htmlFor='totallPrice'>Total Price</label>
          <p>{formData.totallPrice} <span>BHD</span></p>

  
          
          <button>Reserve</button>
        </form>
      </div>
    )
  }
  
export default ReservationForm
