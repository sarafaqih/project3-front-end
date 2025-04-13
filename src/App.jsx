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
import ReservationForm from './components/reservation/ReservationForm'
import Footer from './components/Footer'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router'

function App() {

 const {user} = useContext(authContext)

  return (
    <>
      <Navbar/>
      <Footer/>

      {!user && (
        <Card border="light">
          <h1 className='card-title h1'>Welcome to Timba Stadiums Reservations System</h1>
        </Card>
      )}

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
                <Route path="/stadium/:stadiumId/reservation" element={<ReservationForm/>}/>


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
