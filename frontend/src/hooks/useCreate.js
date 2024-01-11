import { useState } from "react"

export const useCreate = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const create = async (firstName, lastName, email, password, type) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/user/create', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({firstName, lastName, email, password, type})
        })
        const json = await response.json()

        if(!response.ok){
            setIsLoading(null)
            setError(json.error)
        }
        if(response.ok){
            console.log('Successfully created user: ', email)
            setIsLoading(null)
            setError(null)
        }
    }
    return {create, isLoading, error}
}