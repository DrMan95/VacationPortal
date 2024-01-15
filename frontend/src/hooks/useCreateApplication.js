import { useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"

export const useCreateApplication = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const context = useAuthContext()
    const user = context.user

    const create = async (dateFrom, dateTo, reason) => {
        setIsLoading(true)
        setError(null)

        if(!user){
            setError('You must be logged in')
            return
        }

        const response = await fetch('/api/application/submitRequest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({dateFrom, dateTo, reason})
        })
        const json = await response.json()

        if(!response.ok){
            setIsLoading(null)
            setError(json.error)
            return false
        }
        if(response.ok){
            console.log('Successfully created Application', json)
            setIsLoading(null)
            setError(null)
            return true
        }
    }
    return {create, isLoading, error}
}