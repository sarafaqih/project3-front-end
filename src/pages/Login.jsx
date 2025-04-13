import {useState, useContext} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { authContext } from '../context/AuthContext'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'


function Login() {
      const [formData, setFormData] = useState({
          username:"",
          password:""
      })

      const {validateToken} = useContext(authContext)
      const navigate = useNavigate()

      function handleChange(e){
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    async function handleSubmit(e){
      e.preventDefault()
      try{
          const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`,formData)
          console.log(response.data)
          localStorage.setItem("token",response.data.token)
          validateToken()
          navigate("/stadium")
      }
      catch(err){
          console.log(err)
      }
  }


  return (
    <div>
      <h1>Login</h1>
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

      <button style={{backgroundColor:'black', border:'black', color:'white'}} size="lg">Login</button>
     </form>
    </div>
  )
}

export default Login
