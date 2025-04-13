import React from 'react'
import { Link } from 'react-router';

import { useParams } from 'react-router'
import { useState, useEffect } from 'react';
import * as stadiumService from '/src/services/stadiumService.js';
import * as reservationService from '/src/services/ReservationService';








 

 






const ReservationForm = ({handleAddReservation, user}) => {
    const { stadiumId } = useParams();
    console.log('stadiumId:', stadiumId);

    const [stadium, setStadium] = useState(null);
    
            useEffect(() => {
    
                const fetchStadium = async () => {
                  const stadiumData = await stadiumService.show(stadiumId);
                  setStadium(stadiumData);
                  return stadium
                };
                fetchStadium();
              }, [stadiumId]);

              console.log('stadium state:', stadium);
            //   if (!stadium) return <main>Loading... </main>



    // useEffect(() => {
    //     const fetchStadium = async () => {
    //       const stadiumData = await stadiumService.show(stadiumId);
    //       setFormData(stadiumData);
    //     };
    //     if (stadiumId) fetchStadium();
    //   }, [stadiumId]);





 const [formData, setFormData] = useState({
    // reservedAt: Date.now(),
    username:user.username,
    stadium: stadiumId,
    reserveFrom:"",
    reserveTo:"",
    totallPrice:0,
    reservationDate: ''
});

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };












  useEffect(()=>{

    if (formData.reserveFrom && formData.reserveTo && stadium) {
    const [fromHours, fromMinutes] = formData.reserveFrom.split(':').map(Number);
    const [toHours, toMinutes] = formData.reserveTo.split(':').map(Number);

    // Convert both times to total minutes
    const fromTotalMinutes = fromHours * 60 + fromMinutes;
    const toTotalMinutes = toHours * 60 + toMinutes;

    // Difference in minutes
    let diffMinutes = toTotalMinutes - fromTotalMinutes;

    // Handle negative duration (if user picks a "to" time earlier than "from" time)
    if (diffMinutes < 0) {
      diffMinutes += 24 * 60; // assume it's the next day
    }

    // Convert to hours
    const diffInHours = diffMinutes / 60;
    
    console.log(diffInHours +" diff")
    if(formData.totallPrice !== (stadium.PricePerHour * diffInHours)){
      setFormData((prev) => ({ ...prev, totallPrice: (stadium.PricePerHour * diffInHours)}));
    }
  }
  },[formData.reserveFrom, formData.reserveTo, stadium])









  const handleSubmit = (evt) => {
    evt.preventDefault();
    // const reservationData = {
    //     ...formData,
    //     reservedAt: Date.now(), 
    //     stadiumId: stadiumId
    //     // addedBy: props.user.username

    //   };
    // props.handleAddReservation(formData, stadiumId);
    handleAddReservation(formData);
  }

//   async function handleSubmit(e) {
//     e.preventDefault();
//     try{
//       const token = localStorage.getItem("token")

//           const createdReservation = await createReservation(stadiumId, formData)
    
//             navigate("/stadium")
//     }catch(err){
//       console.log(err)
//     }
//   };

//   const handleSubmit = (evt) => {
//     evt.preventDefault();
//     // add handleAddComment
//     setFormData({ text: '' });
//   };

  return (
    <main>
        <h1>Reserve {stadium?.name} Stadium</h1>
        {/* <h1>Reserve {stadium.name} </h1> */}
        {/* {stadium ? (
  <h1>Reserve {stadium.name}</h1>
) : (
  <h1>Loading stadium info...</h1>
)} */}

   
<table border="1" cellPadding="5">
        <tr>
            <td>Name</td> <td>{stadium?.name}</td>
        </tr>

        <tr>
            <td>City</td> <td>{stadium?.city}</td>
        </tr>

        <tr>
            <td>Google Maps</td> <td>{stadium?.GoogleMaps ? stadium?.GoogleMaps : '-'}</td>
        </tr>

        <tr>
            <td>Opening Time</td> <td>{stadium?.openingTime} AM to {stadium?.closingTime} PM</td>
        </tr>

        <tr>
            <td>Contact Number</td> <td>{stadium?.ContactNo}</td>
        </tr>

        {/* <td>Facilities</td>
        <td>
            <ul>
                {stadium.Facilities && stadium.Facilities.length > 0 ? (
                    stadium.Facilities.map((facility) => (
                        <li key={facility}>{facility ? facility : '-'}</li>
                    ))
                ) : (
                    <li>-</li>
                )}
            </ul>

         </td> */}
        {/* <ul>{stadium.Facilities}</ul> */}
       
        <tr>
            <td>Price/Hour</td> <td>{stadium?.PricePerHour}</td>
        </tr>

        {/* <tr>
            <td>Stadium Nature</td> <td>{stadium.StadiumNature}</td>
        </tr> */}
        
        <tr>
            <td>Notes</td> <td>{stadium?.notes ? stadium.notes : '-'}</td>
        </tr>

        {/* <tr>
            <td>player Gender</td> <td>{stadium.playerGender}</td>
        </tr> */}
      </table>
   

        <form onSubmit={handleSubmit}>

<label htmlFor='reservationDate'>Date</label>
  <input type="Date" id='reservationDate' name='reservationDate' value={formData.reservationDate} onChange={handleChange}/>


  <label htmlFor='reserveFrom'>Reserve From</label>
  <input aria-label="Time" type="time" id='reserveFrom' name='reserveFrom' value={formData.reserveFrom} onChange={handleChange}/>


  <label htmlFor='reserveTo'>Reserve To</label>
  <input aria-label="Time" type="time" id='reserveTo' name='reserveTo' value={formData.reserveTo} onChange={handleChange}/>


  <label htmlFor='totallPrice'>Total Price</label>
  {/* <p>{formData.totallPrice} <span>BHD</span></p> */}
  {/* <input  type="number" id='totallPrice' name='totallPrice' value={formData.totallPrice} onChange={handleChange}/> */}
  <label htmlFor='totallPrice'>Total Price</label>
          <p>{formData.totallPrice} <span>BHD</span></p>




  
  <button>Reserve</button>
</form>








      {/* <form onSubmit={handleSubmit}>

      <table border="1" cellPadding="5">
        <tr>
            <td><label htmlFor='name'>Name</label></td> 
            <td><input
          required
          type='text'
          name='name'
          id='name'
          value={formData.name}
          onChange={handleChange}
        /></td>
        </tr>

        <tr>
            <td><label htmlFor='city-name'>City</label></td>
            <td><input
          required
          type='text'
          name='city'
          id='city-name'
          value={formData.city}
          onChange={handleChange}
        /></td>
        </tr>

        <tr>
            <td><label htmlFor='GoogleMaps'>Google Maps</label></td>
            <td><input
          type='text'
          name='GoogleMaps'
          id='GoogleMaps'
          value={formData.GoogleMaps}
          onChange={handleChange}
        /></td>
        </tr>

        <tr>
            <td><label htmlFor='openingTime'>Opening Time</label></td>
            <td><input aria-label="Time" type="time" id='openingTime' name='openingTime' value={formData.openingTime} onChange={handleChange}/>
            </td>
        </tr>

        <tr>
            <td><label htmlFor='closingTime'>Closing Time</label></td>
            <td><input aria-label="Time" type="time" id='closingTime' name='closingTime' value={formData.closingTime} onChange={handleChange}/>
            </td>
        </tr>

        <tr>
            <td><label htmlFor='ContactNo'>Contact Number</label></td>
            <td><input
          required
          type='number'
          name='ContactNo'
          id='ContactNo'
          min='11111111'
          max='99999999'
          value={formData.ContactNo}
          onChange={handleChange}
        /></td>
        </tr>

        <tr>
  <td><label htmlFor="Facilities">Facilities</label></td>
  <td>
    <div>
      <label>
        <input
          type="checkbox"
          name="Facilities"
          value="prayer room"
          checked={formData.Facilities.includes("prayer room")}
          onChange={handleFacilitiesChange}
        />
        Prayer Room
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          name="Facilities"
          value="toilets"
          checked={formData.Facilities.includes("toilets")}
          onChange={handleFacilitiesChange}
        />
        Toilets
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          name="Facilities"
          value="shower"
          checked={formData.Facilities.includes("shower")}
          onChange={handleFacilitiesChange}
        />
        Shower
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          name="Facilities"
          value="locker area"
          checked={formData.Facilities.includes("locker area")}
          onChange={handleFacilitiesChange}
        />
        Locker Area
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          name="Facilities"
          value="coffee shop"
          checked={formData.Facilities.includes("coffee shop")}
          onChange={handleFacilitiesChange}
        />
        Coffee Shop
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          name="Facilities"
          value="free ball"
          checked={formData.Facilities.includes("free ball")}
          onChange={handleFacilitiesChange}
        />
        Free Ball
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          name="Facilities"
          value="water"
          checked={formData.Facilities.includes("water")}
          onChange={handleFacilitiesChange}
        />
        Water
      </label>
    </div>
  </td>
</tr>


        <tr>
            <td><label htmlFor='PricePerHour'>Price Per Hour</label></td>
            <td><input
          required
          type='number'
          name='PricePerHour'
          id='PricePerHour'
          min={0}
          value={formData.PricePerHour}
          onChange={handleChange}
        /></td>
        </tr>

        <tr>
            <td><label htmlFor='StadiumNature'>Stadium Nature</label></td>
            <td><select
          required
          name='StadiumNature'
          id='StadiumNature'
          value={formData.StadiumNature}
          onChange={handleChange}
        >
          <option value='outdoor'>Outdoor</option>
          <option value='indoor'>Indoor</option>
        </select></td>
        </tr>

        <tr>
            <td><label htmlFor='playerGender'>Player Gender</label></td>
            <td><select
          required
          name='playerGender'
          id='playerGender'
          value={formData.playerGender}
          onChange={handleChange}
        >
          <option value='female'>Female</option>
          <option value='male'>Male</option>
          <option value='both'>Both</option>
        </select></td>
        </tr>

        <tr>
            <td><label htmlFor='notes'>Notes</label></td>
            <td><textarea
          type='text'
          name='notes'
          id='notes'
          value={formData.notes}
          onChange={handleChange}
        /></td>
        </tr>
      </table>
        
      
      








        <button type='submit'>Add</button>
        <button><Link to={'/stadium'} style={{ textDecoration: 'none', color: 'inherit' }}>Cancel</Link></button>



      </form> */}
    </main>
  );
};



export default ReservationForm
