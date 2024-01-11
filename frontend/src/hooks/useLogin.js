import { useState } from "react"
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispach } = useAuthContext()

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/user/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })
        const json = await response.json()

        if(!response.ok){
            setIsLoading(null)
            setError(json.error)
        }
        if(response.ok){
            console.log('Successfully loged in: ', email)
            localStorage.setItem('user', JSON.stringify(json))
            dispach({type: 'LOGIN', payload: json})

            setIsLoading(null)
            setError(null)
        }
    }
    return {login, isLoading, error}
}