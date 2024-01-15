import { useAuthContext } from "../hooks/useAuthContext"
import Employee from './Employee'
import Admin from "./Admin"

const Home = () => {
    const context = useAuthContext()
    const user = context.user
    const type = user.type
    return (
        type === 'employee' ? <Employee /> : <Admin />
    )
}

export default Home