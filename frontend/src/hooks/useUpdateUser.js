import { useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"

export const useUpdateUser = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const context = useAuthContext()
    const user = context.user

    const update = async (firstName, lastName, email, password, passwordC, type) => {
        setIsLoading(true)
        setError(null)

        if(!user){
            setError('You must be logged in')
            return
        }
        const response = await fetch('/api/user/updateUser/' + localStorage.getItem('userID'), {
            method: 'PATCH',
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
            console.log('Successfully updated user: ', email)
            setIsLoading(null)
            setError(null)
            return true
        }
    }
    return {update, isLoading, error}
}