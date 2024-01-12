import { useEffect, useState } from "react"
import UserDetails from '../components/UserDetails'

const AllUsers = () => {
    const [users, setUsers] = useState(null)

    useEffect( () => {
        const fetchUsers = async () => {
            const response = await fetch('/api/user/getUsers')
            const json = await response.json()

            if (response.ok){
                setUsers(json)
            }
        }

        fetchUsers()
        localStorage.setItem('userID', '')
    }, [])

    return (
        <div>
            <div className="user-details-container">
                <h2>All Users</h2>
                {users && users.map((user) => (
                    <UserDetails key={user._id} user={user}/>
                ))}
            </div>
        </div>
    )
}

export default AllUsers