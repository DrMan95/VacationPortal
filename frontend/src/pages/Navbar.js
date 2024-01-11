import React from 'react'
import { useLogout } from '../hooks/useLogout'

const Navbar = () => {

  const { logout } = useLogout()
  const handleLogout = () => {
    logout()
  }

  return (
    <div className="nav-bar">
      <div className="nav-left">
        <h1>Vacation Portal</h1>
      </div>
      <div className="nav-right">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}

export default Navbar;