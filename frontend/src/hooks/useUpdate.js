import { useState } from "react"

export const useUpdate = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const update = async (firstName, lastName, email, password, type) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/user/updateUser/' + localStorage.getItem('userID'), {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({firstName, lastName, email, password, type})
        })
        const json = await response.json()

        if(!response.ok){
            setIsLoading(null)
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if(response.ok){
            console.log('Successfully updated user: ', email)
            setIsLoading(null)
            setError(null)
            setEmptyFields([])
        }
    }
    return {update, isLoading, error, emptyFields}
}