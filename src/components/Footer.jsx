import { Link } from "react-router"
import { useContext } from "react"
import { authContext } from "../context/AuthContext"
import "./Footer.css" 

function Footer() {
  const {user, logout} = useContext(authContext)


  return (
    <div className="footer">
      <p>All rights reserved © TIMBA</p>
    </div>
  )
}
export default Footer
