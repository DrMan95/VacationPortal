import { useState, useEffect } from "react"
import { useUpdateUser } from '../hooks/useUpdateUser'
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"

const UpdateUser = () => {

    //const [user, setUser] = useState(null)
    const [id, setId] = useState(null)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordC, setPasswordC] = useState('')
    const [type, setType] = useState('employee')
    const {update, isLoading, error} = useUpdateUser()
    const context = useAuthContext()
    const user = context.user

    const navigate = useNavigate()
    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch('/api/admin/getUser/' + localStorage.getItem('userID'),{
                headers:{
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            if(response.ok){
                //setUser(json)
                setId(json._id)
                setFirstName(json.firstName)
                setLastName(json.lastName)
                setEmail(json.email)
                setType(json.type)
            }
        }
        if(user){
            fetchUser()
        }
    },[user])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(await update(firstName, lastName, email, password, passwordC, type)) {
            navigate('/')
        }
    }
    const handleDelete = async () => {
        if(user) {
            await fetch('/api/admin/deleteUser/' + id, {
                method: 'DELETE',
                headers:{
                    'Authorization': `Bearer ${user.token}`
                }
            })
            localStorage.setItem('userID', '')
            navigate('/')
        }
    }
    const handleBack = async () => {
        localStorage.setItem('userID', '')
        navigate('/')
    }

    return (
        <form className="userForm" onSubmit={handleSubmit}>
            <h3>Update User</h3>
            <label>First Name</label>
            <input
                type = 'text'
                onChange = {(e) => setFirstName(e.target.value)}
                value = {firstName}
                required
            />
            <label>Last Name</label>
            <input
                type = 'text'
                onChange = {(e) => setLastName(e.target.value)}
                value = {lastName}
                required
            />
            <label>Email</label>
            <input
                type = 'email'
                onChange = {(e) => setEmail(e.target.value)}
                value = {email}
                required
            />
            <label>Password</label>
            <input
                type = 'password'
                onChange = {(e) => setPassword(e.target.value)}
                value = {password}
                required
            />
            <label>Confirm Password</label>
            <input
                type = 'password'
                onChange = {(e) => setPasswordC(e.target.value)}
                value = {passwordC}
                required
            />
            <label>Type</label>
            <select
                value={type}
                onChange={(e) => setType(e.target.value)}
            >
                <option value="employee">Employee</option>
                <option value="admin">Admin</option>
            </select>
            <button disabled={isLoading}>Update</button>
            {error && <div className="error">{error}</div>}
            <button className="deleteButton" onClick={handleDelete}>Delete</button>
            <button className="backButton" onClick={handleBack}>Back</button>
        </form>
    )
}

export default UpdateUser