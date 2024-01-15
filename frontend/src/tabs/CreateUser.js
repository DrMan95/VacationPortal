import { useState } from "react"
import { useCreateUser } from "../hooks/useCreateUser"
import { useNavigate } from "react-router-dom"

const CreateUser = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordC, setPasswordC] = useState('')
    const [type, setType] = useState('')
    const {create, isLoading, error} = useCreateUser()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(await create(firstName, lastName, email, password, passwordC, type)){
            navigate('/')
        }
    }

    return (
        <form className="userForm" onSubmit={handleSubmit}>
            <h3>Create User</h3>
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
            <input
                type = 'text'
                onChange = {(e) => setType(e.target.value)}
                value = {type}
                required
            />
            <button disabled={isLoading}>Create</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default CreateUser