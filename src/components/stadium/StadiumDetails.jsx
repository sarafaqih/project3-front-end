import {useState,useEffect} from 'react'
import {useParams} from 'react-router'
import axios from 'axios'

function StadiumDetails() {
    const [stadium,setStadium] = useState(null)

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

    useEffect(()=>{
        getStadium()
    },[])

  return (
    <div>
      <h1>Stadium Details</h1>
      {stadium && (
        <div>
            <p>Name: {stadium.name}</p>
            <p>City: {stadium.city}</p>
        </div>

      )}
    </div>
  )
}

export default StadiumDetails