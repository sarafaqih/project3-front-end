

import { useState , useEffect } from 'react';
import { Link } from 'react-router';
import { useParams } from 'react-router'

import * as stadiumService from '/src/services/stadiumService.js';


const StadiumForm = (props) => {

    const { stadiumId } = useParams()
    console.log(stadiumId);

    useEffect(() => {
        const fetchStadium = async () => {
          const stadiumData = await stadiumService.show(stadiumId);
          setFormData(stadiumData);
        };
        if (stadiumId) fetchStadium();
        
        return () => setFormData({ city:"",
            Governorates:"capital",
            name:"",
            openingTime:'',
            closingTime:'',
            Facilities: [],
            GoogleMaps:"",
            ContactNo:'',
            PricePerHour:'',
            StadiumNature:"outdoor",
            playerGender: "female",
            notes: "", });
      
        }, [stadiumId]);



 const [formData, setFormData] = useState({
    city:"",
    Governorates:"capital",
    name:"",
    openingTime:'',
    closingTime:'',
    Facilities: [],
    GoogleMaps:"",
    ContactNo:'',
    PricePerHour:'',
    StadiumNature:"outdoor",
    playerGender: "female",
    notes: "",
    // addedAt:Date.now(),
    // addedBy: props.user.username
});

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };





  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (stadiumId) {
        props.handleUpdateStadium(stadiumId, formData);
      } else {
        props.handleAddStadium(formData);

      
    const stadiumData = {
        ...formData,
        addedAt: Date.now(), 
        addedBy: props.user.username
    };
    }}






  const handleFacilitiesChange = (evt) => {
    const { value, checked } = evt.target;
    setFormData(prevState => {
      const updatedFacilities = checked
        ? [...prevState.Facilities, value] 
        : prevState.Facilities.filter(facility => facility !== value); 
  
      return {
        ...prevState,
        Facilities: updatedFacilities,
      };
    });
  };





  
  return (
    <main>
        {/* <h1>Add New Stadium</h1> */}
        <h1>{stadiumId ? 'Edit Stadium' : 'Add New Stadium'}</h1>
      <form onSubmit={handleSubmit}>

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
            <td><input aria-label="Time" type="time" id='openingTime' name='openingTime' value={formData.openingTime} onChange={handleChange} required/>
            </td>
        </tr>

        <tr>
            <td><label htmlFor='closingTime'>Closing Time</label></td>
            <td><input aria-label="Time" type="time" id='closingTime' name='closingTime' value={formData.closingTime} onChange={handleChange} required/>
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
          <option value='outdoor' disabled>Choose Stadium Nature</option>
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
          <option value='' disabled>Choose Player Gender</option>
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



      </form>
    </main>
  );
};

export default StadiumForm;
