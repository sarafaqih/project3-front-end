import { Link } from "react-router"
import { useContext } from "react"
import { authContext } from "../context/AuthContext"


function Navbar() {
  const {user, logout} = useContext(authContext)


  return (
    <div>
      <ul>
        <Link to="/"><li>HOMEPAGE</li></Link>
        <li><Link to='/stadium'>STADIUMS</Link></li>

        {user && (

          <>
          <li>Welcome {user.username}</li>
          {/* <li><Link to='/reservation'>RESERVATIONS</Link></li> */}
          {user.role === "admin" && (
              <li><Link to='/reservation'>RESERVATIONS</Link></li>
            )}
            {user.role === "customer" && (
              <li><Link to='reservation'>MY RESERVATIONS</Link></li>
            )}
          <button onClick={logout}>Logout</button>

          </>
        )}
        {!user && (
          <>
          <Link to='/login'><li>Login</li></Link>
          <Link to='/signup'><li>Signup</li></Link>
          </>
        )}
        

      </ul>
    </div>
  )
}

export default Navbar
