import { useState, useEffect } from "react"
import { useUpdate } from '../hooks/useUpdate'
import { useNavigate } from "react-router-dom"

const UpdateUser = () => {

    const [user, setUser] = useState(null)
    const [id, setId] = useState(null)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordC, setPasswordC] = useState('')
    const [type, setType] = useState('')
    const {update, isLoading, error, emptyFields} = useUpdate()

    const navigate = useNavigate();
    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch('/api/user/getUser/' + localStorage.getItem('userID'))
            const json = await response.json()
            if(response.ok){
                setUser(json)
                setId(json._id)
                setFirstName(json.firstName)
                setLastName(json.lastName)
                setEmail(json.email)
                setType(json.type)
            }
        }
        fetchUser()
    }, [])



    const handleSubmit = async (e) => {
        e.preventDefault()
        await update(firstName, lastName, email, password, type)
    }
    const handleDelete = async () => {
        const response = await fetch('/api/user/deleteUser/' + id, {
            method: 'DELETE'
        })
        localStorage.setItem('userID', '')
        navigate('/admin')
      };

    return (
            <form className="createUser">
                <h3>Update User</h3>

                <label>First Name</label>
                <input
                    type = 'text'
                    onChange = {(e) => setFirstName(e.target.value)}
                    value = {firstName}
                    className = {emptyFields.includes('firstName') ? 'error' : ''}
                />
                <label>Last Name</label>
                <input
                    type = 'text'
                    onChange = {(e) => setLastName(e.target.value)}
                    value = {lastName}
                    className = {emptyFields.includes('lastName') ? 'error' : ''}
                />
                <label>Email</label>
                <input
                    type = 'email'
                    onChange = {(e) => setEmail(e.target.value)}
                    value = {email}
                    className = {emptyFields.includes('email') ? 'error' : ''}
                />
                <label>Password</label>
                <input
                    type = 'password'
                    onChange = {(e) => setPassword(e.target.value)}
                    value = {password}
                    className = {emptyFields.includes('password') ? 'error' : ''}
                />
                <label>Confirm Password</label>
                <input
                    type = 'password'
                    onChange = {(e) => setPasswordC(e.target.value)}
                    value = {passwordC}
                />
                <label>Type</label>
                <input
                    type = 'text'
                    onChange = {(e) => setType(e.target.value)}
                    value = {type}
                    className = {emptyFields.includes('type') ? 'error' : ''}
                />
                <button disabled={isLoading} onClick={handleSubmit}>Update</button>
                {error && <div className="error">{error}</div>}
                <button className="deleteButton" onClick={handleDelete}>Delete</button>
            </form>
    )
}

export default UpdateUser