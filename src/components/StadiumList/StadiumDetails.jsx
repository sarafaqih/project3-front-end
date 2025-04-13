import React from 'react'
import { useParams } from 'react-router'
import { useState, useEffect } from 'react';
import * as stadiumService from '/src/services/stadiumService.js';
import { Link } from 'react-router';


import { authContext } from '/src/context/AuthContext.jsx'

console.log(authContext)


function StadiumDetails({handleDeleteStadium, user}) {


        const { stadiumId } = useParams();
        console.log('stadiumId:', stadiumId);

        // const { user } = useContext(authContext);



        const [stadium, setStadium] = useState(null);

        useEffect(() => {

            const fetchStadium = async () => {
              const stadiumData = await stadiumService.show(stadiumId);
              setStadium(stadiumData);
            };
            fetchStadium();
          }, [stadiumId]);
        

          console.log('stadium state:', stadium);
          if (!stadium) return <main>Loading... </main>
  return (
    <div>
      <h1>{stadium.name} Stadium</h1>
      { user.role === 'admin' ? (
        <>
        
          <button><Link to={`/stadium/${stadiumId}/edit`}><img src="/images/editIcon.svg" alt="editIcon" /></Link></button>
          <button onClick={() => handleDeleteStadium(stadiumId)}><img src="/images/deleteIcon.svg" alt="deleteIcon" /></button>
        </>
      ) 
      : (

        <button><Link to={`/stadium/${stadium._id}/newReservation`} style={{ textDecoration: 'none', color: 'inherit' }}>Reserve</Link></button>

      )}

      {/* ) : user.role === 'customer' ? (
        <Link to={`/stadium`}>Reserve</Link>
      ) : null} */}
      

      
      <table border="1" cellPadding="5">
        <tr>
            <td>Name</td> <td>{stadium.name}</td>
        </tr>

        <tr>
            <td>City</td> <td>{stadium.city}</td>
        </tr>

        <tr>
            <td>Google Maps</td> <td>{stadium.GoogleMaps ? stadium.GoogleMaps : '-'}</td>
        </tr>

        <tr>
            <td>Opening Time</td> <td>{stadium.openingTime} AM to {stadium.closingTime} PM</td>
        </tr>

        <tr>
            <td>Contact Number</td> <td>{stadium.ContactNo}</td>
        </tr>
        <td>Facilities</td>
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

         </td>
        {/* <ul>{stadium.Facilities}</ul> */}
        <tr>
            <td>Price/Hour</td> <td>{stadium.PricePerHour}</td>
        </tr>

        <tr>
            <td>Stadium Nature</td> <td>{stadium.StadiumNature}</td>
        </tr>
        
        <tr>
            <td>Notes</td> <td>{stadium.notes ? stadium.notes : '-'}</td>
        </tr>

        <tr>
            <td>player Gender</td> <td>{stadium.playerGender}</td>
        </tr>
      </table>
      



      {/* <section>
        <header>
          <p>{hoot.category.toUpperCase()}</p>
          <h1>{hoot.title}</h1>
          <p>
            {`${hoot.author.username} posted on
            ${new Date(hoot.createdAt).toLocaleDateString()}`}
          </p>
        </header>
        <p>{hoot.text}</p>
      </section>
      <section>
        <h2>Comments</h2>
      </section>
 */}


    </div>
  )
}

export default StadiumDetails
