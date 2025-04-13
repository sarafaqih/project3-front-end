import {useState,useEffect} from 'react'
import {useParams} from 'react-router'
import axios from 'axios'

function ReservationDetails() {
    const [reservation,setReservation] = useState(null)

    // step 1: get Id from the parameter
    const {reservationId} = useParams()

    async function getReservation(){
        try{
            const token = localStorage.getItem("token")
            const fetchedReservation = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/stadium/reservations/${reservationId}`,{headers:{Authorization:`Bearer ${token}`}})

            setReservation(fetchedReservation.data)
            console.log(fetchedReservation.data)

        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        getReservation()
    },[])

  return (
    <div>
      <h1>Reservation Details</h1>
      {reservation && (
        <div>
            <p>from: {reservation.reserveFrom}</p>
            <p>to: {reservation.reserveTo}</p>
        </div>

      )}
    </div>
  )
}

export default ReservationDetails