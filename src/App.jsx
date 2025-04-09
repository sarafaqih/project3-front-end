import './App.css'
import { useState, useContext } from 'react'
import {Routes ,Route, useNavigate} from 'react-router'
import Login from './pages/Login'
import Homepage from './pages/Homepage'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'
import ValidateIsLoggedIn from './validators/ValidateIsLoggedIn'
import ValidateIsLoggedOut from './validators/ValidateIsLoggedOut'
import StadiumForm from './components/stadium/StadiumForm'
// import stadiumService from './service/stadiumService'
import StadiumList from './components/stadium/StadiumList'
import { authContext } from './context/AuthContext'

function App() {

 const {user} = useContext(authContext)

  const [stadiums, setStadiums] = useState([]);

  const navigate = useNavigate();
  // const handleAddStadium = async (stadiumFormData) => {
  //   const newStadium = await stadiumService.createStadium(stadiumFormData)
  //   setStadiums([newStadium, ...stadiums])
  //   console.log('stadiumFormData', stadiumFormData);
  //   navigate('/stadium');
  // };

  return (
    <>
      <Navbar/>
      <Routes>
        { user ? (
          <>
                <Route path="/stadium" element={<StadiumList/>}/>
          </>
        ) : 
        (    
          <>        
              <Route path="/signup" element={<Signup/>}/>
              <Route path="/login" element={<Login/>}/>
          </>
        )
        }

      </Routes>
    </>
  )
} 

export default App
