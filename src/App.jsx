import './App.css'
import { useState, useContext } from 'react'
import {Routes ,Route, useNavigate} from 'react-router'
import Login from './pages/Login'
import Homepage from './pages/Homepage'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'
import ValidateIsLoggedIn from './validators/ValidateIsLoggedIn'
import ValidateIsLoggedOut from './validators/ValidateIsLoggedOut'
import StadiumForm from './components/stadium/stadiumForm'
import StadiumList from './components/stadium/StadiumList'
import { authContext } from './context/AuthContext'
import StadiumDetails from './components/stadium/StadiumDetails'
import StadiumUpdate from './components/stadium/StadiumUpdate'
import ListReservation from './components/reservation/ListReservation'
import ReservationDetails from './components/reservation/ReservationDetails'

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
                <Route path="/stadium/:stadiumId/update" element={<StadiumUpdate/>}/>
                <Route path="/stadium/:stadiumId/update" element={<StadiumUpdate/>}/>
                <Route path='/stadium/reservations' element={<ListReservation/>}/>
                <Route path='/stadium/reservations/:reservationId' element={<ReservationDetails/>}/>

          </>
        ) : (    
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
