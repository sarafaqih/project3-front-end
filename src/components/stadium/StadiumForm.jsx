// src/components/HootForm/HootForm.jsx

import { useState } from 'react';

const StadiumForm = (props) => {
  const [formData, setFormData] = useState({
    city:"",
    Governorates:"Capital",
    name:"",
    openingTime:'',
    closingTime:'',
    Facilities:"Prayer Room",
    GoogleMaps:"",
    ContactNo:'',
    PricePerHour:'',
    StadiumNature:"Outdoor",
    playerGender: "Female",
    notes: "",
    addedAt:Date.now(),
    addedBy:''
});

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.handleAddStadium(formData);
    console.log('formData', formData);
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
      <label htmlFor='name'>Name</label>
        <input
          required
          type='text'
          name='name'
          id='name'
          value={formData.name}
          onChange={handleChange}
        />

        <label htmlFor='openingTime'>Opening Time</label>
        <input aria-label="Time" type="time" id='openingTime' name='openingTime' value={formData.openingTime} onChange={handleChange}/>

        <label htmlFor='closingTime'>Closing Time</label>
        <input aria-label="Time" type="time" id='closingTime' name='closingTime' value={formData.closingTime} onChange={handleChange}/>

        <label htmlFor='Facilities'>Facilities</label>
        <select
          name='Facilities'
          id='Facilities'
          value={formData.Facilities}
          onChange={handleChange}
        >
          <option value='prayer-room'>Prayer Room</option>
          <option value='toilets'>Toilets</option>
          <option value='shower'>Shower</option>
          <option value='locker-area'>Locker Area</option>
          <option value='coffee-shop'>Coffee Shop</option>
          <option value='free-ball'>Free Ball</option>
          <option value='water'>Water</option>
        </select>

        <label htmlFor='GoogleMaps'>Google Maps</label>
        <input
          type='text'
          name='GoogleMaps'
          id='GoogleMaps'
          value={formData.GoogleMaps}
          onChange={handleChange}
        />

        <label htmlFor='ContactNo'>Contact Number</label>
        <input
          required
          type='number'
          name='ContactNo'
          id='ContactNo'
          min='11111111'
          max='99999999'
          value={formData.ContactNo}
          onChange={handleChange}
        />

        <label htmlFor='PricePerHour'>Price Per Hour</label>
        <input
          required
          type='number'
          name='PricePerHour'
          id='PricePerHour'
          min={0}
          value={formData.PricePerHour}
          onChange={handleChange}
        />

        <label htmlFor='StadiumNature'>Stadium Nature</label>
        <select
          required
          name='StadiumNature'
          id='StadiumNature'
          value={formData.StadiumNature}
          onChange={handleChange}
        >
          <option value='outdoor'>Outdoor</option>
          <option value='indoor'>Indoor</option>
        </select>

        <label htmlFor='playerGender'>Player Gender</label>
        <select
          required
          name='playerGender'
          id='playerGender'
          value={formData.playerGender}
          onChange={handleChange}
        >
          <option value='female'>Female</option>
          <option value='male'>Male</option>
          <option value='both'>Both</option>
        </select>


        <label htmlFor='city-name'>City</label>
        <input
          required
          type='text'
          name='city'
          id='city-name'
          value={formData.city}
          onChange={handleChange}
        />
        <label htmlFor='governorate-input'>Governorate</label>
        <select
          required
          name='Governorates'
          id='governorate-input'
          value={formData.Governorates}
          onChange={handleChange}
        >
          <option value='capital'>Capital</option>
          <option value='muharraq'>Muharraq</option>
          <option value='northern'>Northern</option>
          <option value='southern'>Southern</option>
        </select>

        <label htmlFor='notes'>Notes</label>
        <textarea
          type='text'
          name='notes'
          id='notes'
          value={formData.notes}
          onChange={handleChange}
        />


        <button type='submit'>SUBMIT</button>
      </form>
    </main>
  );
};

export default StadiumForm;
