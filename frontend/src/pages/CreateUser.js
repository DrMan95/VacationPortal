import { useState } from "react"
import { useCreate } from "../hooks/useCreate"

const CreateUser = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordC, setPasswordC] = useState('')
    const [type, setType] = useState('')
    const {create, isLoading, error} = useCreate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await create(firstName, lastName, email, password, type)

    }

    return (
        <form className="createUser" onSubmit={handleSubmit}>
            <h3>Create User</h3>

            <label>First Name</label>
            <input
                type = 'text'
                onChange = {(e) => setFirstName(e.target.value)}
                value = {firstName}
            />
            <label>Last Name</label>
            <input
                type = 'text'
                onChange = {(e) => setLastName(e.target.value)}
                value = {lastName}
            />
            <label>Email</label>
            <input
                type = 'email'
                onChange = {(e) => setEmail(e.target.value)}
                value = {email}
            />
            <label>Password</label>
            <input
                type = 'password'
                onChange = {(e) => setPassword(e.target.value)}
                value = {password}
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
            />
            <button disabled={isLoading}>Create</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default CreateUser