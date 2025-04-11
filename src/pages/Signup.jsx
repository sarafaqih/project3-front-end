import {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'

function Signup() {

    const [formData, setFormData] = useState({
        username:"",
        password:"",
        gender:"",
        ContactNo:"",
        role:"customer"
        
    })

    const navigate = useNavigate()
    

    function handleChange(e){
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    async function handleSubmit(e){
        e.preventDefault()
        try{
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/sign-up`,formData)
            navigate("/login")
        }
        catch(err){
            console.log(err)
        }
    }
  return (
    <div>
      
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
         type="text"
         name='username'
         id='username'
         value={formData.username}
         onChange={handleChange}
         required
          />

        <label htmlFor="password">Password:</label>
        <input
         type="password"
         name='password'
         id='password'
         value={formData.password}
         onChange={handleChange}
         required
          />

        <label htmlFor="ContactNo">Contact Number:</label>
        <input
         type="number"
         name='ContactNo'
         id='ContactNo'
         value={formData.ContactNo}
         onChange={handleChange}
         min="10000000"
         max= "99999999" 
         required
          />
        
      <div onChange={handleChange} id='gender'>
      <label htmlFor="gender">Gender:</label>

        <input type="radio" value="male" name="gender" required/> Male
        <input type="radio" value="female" name="gender" required/> Female
      </div>
        
        <input
         type="text"
         name='role'
         id='role'
         value={formData.role}
         onChange={handleChange}
         hidden
          />




          <button>Submit</button>
      </form>
    </div>
  )
}

export default Signup
