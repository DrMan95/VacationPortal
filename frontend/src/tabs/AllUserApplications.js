import { useEffect, useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import ApplicationDetails from '../components/ApplicationDetails'

const AllUserApplications = () => {
    const [applications, setApplications] = useState(null)
    const context = useAuthContext()
    const user = context.user

    useEffect(() => {
        const fetchUserApplications = async () => {
            const response = await fetch('/api/application/getUserApplications/', {
              headers: {
                'Authorization': `Bearer ${user.token}`
              }
            })
            const json = await response.json()

            if(response.ok){
              setApplications(json)
            }else{
              console.log(json.error)
            }
        }
        if (user) {
          fetchUserApplications()
        }
    }, [user.id, user])
    return (
      <div className="applications-list">
        <h2>My Applications</h2>
        {applications && applications.map((application) => (
            <ApplicationDetails key={application._id} application={application} />
        ))}
      </div>
    )
  }
export default AllUserApplications