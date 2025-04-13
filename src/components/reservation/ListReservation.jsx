import {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import {Link} from "react-router"
import { authContext } from '../../context/AuthContext'
import { getAllReservations } from '../../service/reservationService'

function ListReservation() {
    const [reservations,setReservations] = useState([]) 

    const {user} = useContext(authContext)
    console.log(user._id)
    console.log("i am the role" + user.role)

    async function getReservation(){
        try{
            
            const fetchedReservations = await getAllReservations()
            console.log(fetchedReservations)
            setReservations(fetchedReservations)

        }
        catch(error){
            console.log(error)
        }

    }


    useEffect(()=>{
        getReservation()
    },[])

    return (
        <div style={{padding:'70px'}}>
          <h1>Reservation List</h1>
    
          {reservations.map((oneReservation)=>
          <div style={{margin:"100px"}} key={oneReservation._id}>
            
                <Link to={`/stadium/reservations/${oneReservation._id}`}>
                <h2>{oneReservation.reserveFrom}</h2>
                    <p>{oneReservation.reserveTo}</p>
                </Link>
          </div>
        )}
</div>
)
}
export default ListReservation
