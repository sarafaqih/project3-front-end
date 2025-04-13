import {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'

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
      <h1>Signup</h1>
      <br />

      
      <form onSubmit={handleSubmit}>
       
      <InputGroup size="lg" className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-lg" htmlFor="username">Username</InputGroup.Text>
        <Form.Control
          aria-label="Large"
          aria-describedby="inputGroup-sizing-lg"
          type="text"
          name='username'
          id='username'
          value={formData.username}
          onChange={handleChange}
          required
        />
      </InputGroup>

      <InputGroup size="lg" className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-lg" htmlFor="password">Password</InputGroup.Text>
        <Form.Control
          aria-label="Large"
          aria-describedby="inputGroup-sizing-lg"
          type="password"
          name='password'
          id='password'
          value={formData.password}
          onChange={handleChange}
          required
         />
      </InputGroup>

      <InputGroup size="lg" className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-lg" htmlFor="ContactNo">Contact Number</InputGroup.Text>
        <Form.Control
          aria-label="Large"
          aria-describedby="inputGroup-sizing-lg"
          type="number"
          name='ContactNo'
          id='ContactNo'
          value={formData.ContactNo}
          onChange={handleChange}
          min="10000000"
          max= "99999999"
          required
         />
      </InputGroup>

      <div onChange={handleChange} id='gender'>
      <InputGroup size="lg" className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-lg" htmlFor="gender">Gender</InputGroup.Text>
        <Form.Check
          type="radio"
          value="male" 
          name="gender" 
          required/> Male
          <Form.Check
          type="radio"
          value="female" 
          name="gender" 
          required/> Female

      </InputGroup>
      </div>

      <button style={{backgroundColor:'black', border:'black', color:'white'}} size="lg">Signup</button>
      </form>
    </div>
  )
}

export default Signup
