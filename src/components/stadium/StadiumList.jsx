import {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import {Link} from "react-router"
import { authContext } from '../../context/AuthContext'
import { getAllStadiums } from '../../service/stadiumService'

function StadiumList() {
    const [stadiums,setStadiums] = useState([]) 

    const {user} = useContext(authContext)
    console.log(user._id)

    async function getStadiums(){
        try{
            
            const fetchedStadiums = await getAllStadiums()
            console.log(fetchedStadiums)
            setStadiums(fetchedStadiums)

        }
        catch(error){
            console.log(error)
        }

    }

    useEffect(()=>{
        getStadiums()
    },[])

    return (
        <div>
          <h1>Stadium List</h1>
    
          {stadiums.map((oneStadium)=>
          <div style={{margin:"100px"}} key={oneStadium._id}>
            
                <Link to={`/stadiums/${oneStadium._id}`}>
                <h2>{oneStadium.name}</h2>
                    <p>{oneStadium.city}</p>
                </Link>
    
              {user._id === oneStadium.addedBy._id && (
                <>
                <button onClick={()=>{deleteStadium(oneStadium._id)}}>Delete Stadium</button>
                <Link to={`/stadium/${oneStadium._id}/edit`}><button>Update Stadium</button></Link>
    
                </>
    
                )}
              
            
                    
          </div>
        )}
        </div>
      )
    }
    
    export default StadiumList