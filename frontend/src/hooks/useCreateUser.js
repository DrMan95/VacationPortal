import { useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"

export const useCreateUser = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const context = useAuthContext()
    const user = context.user

    const create = async (firstName, lastName, email, password, passwordC, type) => {
        setIsLoading(true)
        setError(null)

        if(!user){
            setError('You must be logged in')
            return
        }
        const response = await fetch('/api/user/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({firstName, lastName, email, password, passwordC, type})
        })
        const json = await response.json()

        if(!response.ok){
            setIsLoading(null)
            setError(json.error)
            return false
        }
        if(response.ok){
            console.log('Successfully created user: ', email)
            setIsLoading(null)
            setError(null)
            return true
        }
    }
    return {create, isLoading, error}
}