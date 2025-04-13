import './App.css'

import Login from './pages/Login'
import Homepage from './pages/Homepage'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'
import ValidateIsLoggedIn from './validators/ValidateIsLoggedIn'
import ValidateIsLoggedOut from './validators/ValidateIsLoggedOut'
import StadiumList from './components/stadiumList/stadiumList'
import { index } from './services/StadiumService' 
import * as stadiumService from './services/StadiumService';

import { useContext, useState, useEffect } from 'react';
import { authContext } from './context/AuthContext'
import StadiumDetails from './components/StadiumList/StadiumDetails'
import StadiumForm from './components/StadiumList/StadiumForm'
import { Routes, Route, useNavigate } from 'react-router'


import * as reservationService from './services/ReservationService';
import ReservationForm from './components/ReservationList/ReservationForm'
import ReservationList from './components/ReservationList/ReservationList'








function App() {

const [stadiums, setStadiums] = useState([]);
const [reservations, setReservations] = useState([]);


  // const { user } = useContext(UserContext)
  const {user} = useContext(authContext)
   console.log(user)


  useEffect(() => {

    const fetchAllstadiums = async () => {
      const stadiumsData = await stadiumService.index();
      setStadiums(stadiumsData);
      // console log to verify
      console.log('stadiumsData:', stadiumsData);
    };
    if (user) fetchAllstadiums();
  }, [user]);
  


  const navigate = useNavigate()


  const handleAddStadium = async (stadiumFormData) => {
    const newStadium = await stadiumService.create(stadiumFormData);
    setStadiums([newStadium, ...stadiums]);
    navigate('/stadium');
  };



  const handleDeleteStadium = async (stadiumId) => {
    const deletedStadium = await stadiumService.deleteStadium(stadiumId);

    setStadiums(stadiums.filter((stadium) => stadium._id !== deletedStadium._id));
    navigate('/stadium')

  }


  const handleUpdateStadium = async (stadiumId, stadiumFormData) => {
    // console.log('stadiumId:', stadiumId, 'stadiumFormData:', stadiumFormData);
    const updatedStadium = await stadiumService.update(stadiumId, stadiumFormData);
    setStadiums(stadiums.map((stadium) => (stadiumId === stadium._id ? updatedStadium : stadium)));
    navigate(`/stadium/${stadiumId}`);
  }


  






  useEffect(() => {
    const fetchAllReservations = async () => {
      const reservationsData = await reservationService.index();
      setReservations(reservationsData);
    };
    if (user) fetchAllReservations();
  }, [user]);





  const handleAddReservation = async (reservationFormData) => {
    console.log('reservationFormData', reservationFormData)
    const newReservation = await reservationService.create(reservationFormData);
    setReservations([newReservation, ...reservations]);
    navigate('/reservation');

  };



  

return (
  <>
    <Navbar/>

    <Routes>

      <Route path='/' element={user ? <Homepage /> : <Homepage />} />
      {user ? (
        <>
          {/* Protected routes (available only to signed-in users) */}
          <Route path='/stadium' element={<StadiumList stadiums={stadiums} user={user} handleDeleteStadium={handleDeleteStadium}/>} />
          <Route path='/stadium/:stadiumId' element={<StadiumDetails user={user} handleDeleteStadium={handleDeleteStadium}/>}/>
          <Route path='/stadium/new' element={<StadiumForm handleAddStadium={handleAddStadium} user={user}/>} />

          <Route path='/stadium/:stadiumId/edit'element={<StadiumForm handleUpdateStadium={handleUpdateStadium}/>}/>
          <Route path='/stadium/:stadiumId/edit'element={<StadiumList handleUpdateStadium={handleUpdateStadium}/>}/>






          <Route path='/reservation' element={<ReservationList reservations={reservations} user={user} handleDeleteStadium={handleDeleteStadium}/>} />

          <Route path='/stadium/:stadiumId/newReservation' element={<ReservationForm handleAddReservation={handleAddReservation} user={user} /> } />





        </>
      ) : (
        <>
          {/* Non-user routes (available only to guests) */}
          <Route path='/signup' element={<Signup/>} />
          <Route path='/login' element={<Login/>} />

        </>
      )}

    </Routes>
  </>
)

}
export default App


