import React from 'react'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'


const Navbar = () => {
  const { user } = useAuthContext()
  const { logout } = useLogout()
  const handleLogout = () => {
    logout()
  }

  return (
    <div className="nav-bar">
      <div className="nav-left">
        <h1>Vacation Portal</h1>
      </div>
      {user && 
        (<div className="nav-right">
          <div className="user-info">
            <span>{user.firstName} {user.lastName}</span>
          </div>
          <button onClick={handleLogout}>Logout</button>
        </div>)
      }
    </div>
  )
}

export default Navbar;