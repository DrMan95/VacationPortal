import { useEffect, useState } from "react"
import UserDetails from '../components/UserDetails'
import { useAuthContext } from "../hooks/useAuthContext"

const AllUsers = () => {
    const [users, setUsers] = useState(null)
    const context = useAuthContext()
    const user = context.user

    useEffect( () => {
        const fetchUsers = async () => {
            const response = await fetch('/api/admin/getUsers',{
                headers:{
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok){
                setUsers(json)
            }else{
                console.log(json.error)
            }
        }
        if (user){
            fetchUsers()
        }
    },[user])

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