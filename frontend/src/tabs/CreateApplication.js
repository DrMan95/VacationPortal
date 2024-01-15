import React, { useState } from 'react'
import { useCreateApplication } from '../hooks/useCreateApplication'
import { useNavigate } from "react-router-dom"

const CreateApplication = () => {
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [reason, setReason] = useState('')
  const {create, isLoading, error} = useCreateApplication()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (await create(dateFrom, dateTo, reason)) {
      navigate('/')
    }
  }

  return (
    <form className="application-form" onSubmit={handleSubmit}>
      <h2>New Vacation Application</h2>
      <label>Start Date:</label>
      <input
        type="date"
        min={new Date().toISOString().split('T')[0]}
        value={dateFrom}
        onChange={(e) => setDateFrom(e.target.value)}
        required
      />

      <label>End Date:</label>
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