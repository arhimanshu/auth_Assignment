import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from './context/Auth'
function Navbar() {

    const [auth,setAuth]=useAuth()
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/" className="navbar-brand" href="#">
        Homepage
        </Link>

        <ul className="navbar-nav">
          <li className="nav-item">
            {!auth.jwt_token ? (
              <div>
                <Link to="/Register" className="p-2">
                  Register
                </Link>

                <Link to="/Login" className="p-2">
                  Login
                </Link>
              </div>
            ) : (
              <Link to="/Logout" className="p-2">
                Logout
              </Link>
            )}
          </li>
          <li className="nav-item">
            <Link to="/dashboard" className="nav-item" href="#">
              Dashboard
            </Link>
          </li>
        </ul>
      </nav>
  )
}

export default Navbar