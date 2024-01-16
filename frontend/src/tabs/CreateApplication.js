import { useState } from 'react'
import { useCreateApplication } from '../hooks/useCreateApplication'

const CreateApplication = () => {
  const [dateFrom, setDateFrom] = useState(new Date().toISOString().split('T')[0])
  const [dateTo, setDateTo] = useState(new Date().toISOString().split('T')[0])
  const [reason, setReason] = useState('')
  const {create, isLoading, error} = useCreateApplication()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (await create(dateFrom, dateTo, reason)) {
      window.location.reload(false);
    }
  }

  return (
    <form className="application-form" onSubmit={handleSubmit}>
      <h2>New Vacation Application</h2>
      <label>Vacation start from:</label>
      <input
        type="date"
        min={new Date().toISOString().split('T')[0]}
        value={dateFrom}
        onChange={(e) => setDateFrom(e.target.value)}
        required
      />

      <label>Vacation end:</label>
      <input
        type="date"
        min={new Date().toISOString().split('T')[0]}
        value={dateTo}
        onChange={(e) => setDateTo(e.target.value)}
        required
      />

      <label>Reason:</label>
      <textarea
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        required
      ></textarea>

      <button disabled={isLoading} type="submit">Submit Application</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default CreateApplication