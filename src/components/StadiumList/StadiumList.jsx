import React from 'react'

import { useParams, Link } from 'react-router'

function StadiumList({ stadiums, user , handleDeleteStadium}) {
  if (user.role === "customer") {
    return (
      <div>
        <h1>Stadiums List</h1>
        {stadiums.map((stadium) => (
          <Link key={stadium._id} to={`/stadium/${stadium._id}`}>
            <article style={{ border: "2px solid black", margin: "1rem 0" }}>
              <header>
                <h2>{stadium.name}</h2>
                <p>{stadium.Governorates}</p>
              </header>

              <p>{stadium.StadiumNature}</p>
              <p>{`${stadium.PricePerHour} BHD`}</p>

              <ul>
                {stadium.Facilities && stadium.Facilities.length > 0 ? (
                  stadium.Facilities.map((facility) => {
                    if (facility === "shower") {
                      return <li key={facility}><img src="/images/Picture 1.svg" alt="shower" /></li>;
                    } else if (facility === "coffee shop") {
                      return <li key={facility}><img src="/images/Picture 2.svg" alt="coffee shop" /></li>;
                    } else if (facility === "toilets") {
                      return <li key={facility}>Toilets</li>;
                    } else if (facility === "prayer room") {
                      return <li key={facility}>Prayer Room</li>;
                    } else if (facility === "locker area") {
                      return <li key={facility}>Locker Area</li>;
                    } else if (facility === "free ball") {
                      return <li key={facility}>Free Ball</li>;
                    } else if (facility === "water") {
                      return <li key={facility}><img src="/images/water.svg" alt="water" /></li>;
                    } else {
                      return <li key={facility}>{facility}</li>;
                    }
                  })
                ) : (
                  <li>No facility</li>
                )}
              </ul>
            </article>
          </Link>
        ))}
      </div>
    )
  } else {
    let count = 1
    return (
      <div>
        <h1>Stadiums List</h1>

        <h3>          <Link to={`/stadium/new`}>New Stadium</Link></h3>
        <table border="1" cellPadding="10">

            <tr>
                <th>No</th>
              <th>Name</th>
              <th>City</th>
              <th>Opening Time</th>
              <th>Contact Number</th>
              <th>Action</th>
            </tr>


            {stadiums.map((stadium) => (
          
              <tr key={stadium._id}>
                <td>{count++}</td>
               <Link key={stadium._id} to={`/stadium/${stadium._id}`} style={{ textDecoration: 'none', color: 'inherit' , border: "none"}}> <td>{stadium.name}</td> </Link>

                <td>{stadium.Governorates}</td>
                <td>{`${stadium.openingTime} AM – ${stadium.closingTime} PM`}</td>
                <td>{stadium.ContactNo}</td>
                <td>

                <button><Link to={`/stadium/${stadium._id}/edit`}><img src="/images/editIcon.svg" alt="editIcon" /></Link></button>
                
                <button onClick={() => handleDeleteStadium(stadium._id)}><img src="/images/deleteIcon.svg" alt="deleteIcon" /></button>

                </td>
              </tr>
            ))}

        </table>
      </div>
    );
  }
}

export default StadiumList;
