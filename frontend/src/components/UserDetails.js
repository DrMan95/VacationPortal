import { useNavigate } from "react-router-dom"

const UserDetails = ({user}) => {
  const navigate = useNavigate();

  const navigateUpdateUser = () => {
    localStorage.setItem('userID', user._id)
    navigate('/admin/updateuser')
  }

  return (
    <div className="user-details" onClick={navigateUpdateUser}>
      <span>{user.firstName} {user.lastName}</span>
      <p>Email: {user.email}</p>
      <p>Type: {user.type}</p>
    </div>
  )
}

export default UserDetails