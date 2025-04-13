import { Link } from "react-router"
import { useContext } from "react"
import { authContext } from "../context/AuthContext"
import "./Navbar.css" 
import Button from 'react-bootstrap/Button'

function Navbar() {
  const {user, logout} = useContext(authContext)


  return (
<div className="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow-sm">
      <div className="navbar-content">
        {/* Left side: Logo */}
        <div className="navbar-logo">
          <img src="https://i.ibb.co/svcPXwCM/Timba-Logo.png" alt="logo" />
        </div>

        {/* Right side: Nav links */}
        <div className="navbar-links">
          {/*Navbar for admin and customer*/}
          {user &&  (
          <>
          {user.role==='admin' && (
            <>
            <h5>Welcome {user.username}</h5>
            <button><Link to='/stadium' style={{color:'black', textDecoration:'auto'}}>Stadiums</Link></button>
            <button><Link to='/stadium/reservations' style={{color:'black', textDecoration:'auto'}}>Reservations</Link></button>
            <button><Link to='/stadium/new' style={{color:'black', textDecoration:'auto'}}>Add New Stadium</Link></button>
            <button onClick={logout}>Logout</button>
            </>
          )}
          </>
          )}

          {user &&  (
          <>
          {user.role==='customer' && (
            <>
            <h5>Welcome {user.username}</h5>
            <button><Link to='/stadium' style={{color:'black', textDecoration:'auto'}}>Stadiums</Link></button>
            <button><Link to='/stadium/reservations' style={{color:'black', textDecoration:'auto'}}>Reservations</Link></button>
            <button onClick={logout}>Logout</button>
            </>
          )}
          </>
          )}
          {!user && (
            <>
            <Button style={{backgroundColor:'#ffffff', border:'black'}}><Link to='/login' style={{color:'black', textDecoration:'auto'}}>Login</Link></Button>
            <Button style={{backgroundColor:'#ffffff', border:'black'}}><Link to='/signup' style={{color:'black', textDecoration:'auto'}}>Signup</Link></Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
export default Navbar
