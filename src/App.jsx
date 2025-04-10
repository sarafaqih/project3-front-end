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
import StadiumDetails from './components/stadium/StadiumDetails'

function App() {

 const {user} = useContext(authContext)

  return (
    <>
      <Navbar/>
      <Routes>
        { user ? (
          <>
                <Route path="/stadium" element={<StadiumList/>}/>
                <Route path='/stadium/:stadiumId' element={<StadiumDetails/>}/>
                <Route path="/stadium/new" element={<StadiumForm/>}/>
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
