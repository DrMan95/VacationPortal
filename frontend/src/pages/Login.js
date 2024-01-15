import { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, isLoading, error} = useLogin()

    const navigate = useNavigate()
    const context = useAuthContext()
    const user = context.user

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email, password)
        if (user){
            navigate('/home')
        }
    }

    return (
        <form className="login" onSubmit={handleSubmit}>
            <h3>Log in</h3>

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
            <button disabled={isLoading}>Login</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Login