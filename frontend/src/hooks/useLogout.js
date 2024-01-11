import { useAuthContext } from './useAuthContext'

export const useLogout = () => {
    const { dispach } = useAuthContext()

    const logout = () => {
        //remove user from storage
        localStorage.removeItem('user')

        //dispach logout action
        dispach({type: 'LOGOUT'})
    }
    return {logout}
}