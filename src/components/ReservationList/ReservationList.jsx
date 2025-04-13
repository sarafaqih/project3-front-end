import React from 'react'
import { useParams, Link } from 'react-router'


function ReservationList({reservations, user}) {
    let count = 1
    console.log(reservations)
    if (user.role === "admin") {
  
    return (
    <div>

    <h1>Reservations List</h1>

      <table border="1" cellPadding="10">

          <tr>
            <th>No</th>
            <th>Customer Name</th>
            <th>Stadium</th>
            <th>Reservation Time</th>
            <th>Total Price</th>
            <th>Customer Contact Number</th>
            {/* <th>Action</th> */}
          </tr>


          {reservations.map((reservation) => (
            <tr key={reservation._id}>
              <td>{count++}</td>
              <td>{reservation.username.username}</td>
              {/* <td>{reservation.stadium.name}</td> */}
              <td>{reservation.stadium ? reservation.stadium.name : 'N/A (stadium is deleted)'}</td>
              <td>{reservation.reserveFrom} AM – {reservation.reserveTo} PM </td> 
              <td>{reservation.totallPrice} BHD</td>
              <td>{reservation.username.ContactNo}</td>
              {/* <td>
                <button>
                  <Link to={`/reservation/${reservation._id}/edit`}>
                    <img src="/images/editIcon.svg" alt="editIcon" />
                  </Link>
                </button>
                <button onClick={() => handleDeleteReservation(reservation._id)}>
                  <img src="/images/deleteIcon.svg" alt="deleteIcon" />
                </button>
              </td> */}
            </tr>
          ))}

      </table>

    </div>

  )
}else {
    let count = 1
    const userReservations = reservations.filter(
        (reservation) => reservation.username._id === user._id
    );

    return (
        <div>
            <h1>Your Reservations</h1>
            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Stadium</th>
                        <th>Reservation Time</th>
                        <th>Total Price</th>
                        <th>Stadium Contact Number</th>
                    </tr>
                </thead>
                <tbody>
                    {userReservations.length > 0 ? (
                        userReservations.map((reservation) => (
                            <tr key={reservation._id}>
                                <td>{count++}</td>
                                <td>{reservation.stadium ? reservation.stadium.name : 'N/A (stadium is deleted)'}</td>
                                <td>{reservation.reserveFrom} AM – {reservation.reserveTo} PM</td>
                                <td>{reservation.totallPrice} BHD</td>
                                <td>{reservation.stadium? reservation.stadium.ContactNo : 'N/A (stadium is deleted)'}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No reservations found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );

  }
}

export default ReservationList
