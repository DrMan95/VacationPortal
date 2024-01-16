const Application = ({ application }) => {

  const submitedDate = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(new Date(application.createdAt))
  const startDate = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(new Date(application.dateFrom))
  const endDate = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(new Date(application.dateTo))

  const daysRequested = (startDate, endDate) => {
    let days = (endDate - startDate)/(1000*60*60*24)
    return days + 1
  }

  return (
    <div className="application">
      <p>Date Submitted: <strong>{submitedDate}</strong></p>
      <p>Dates Requested: <strong>{startDate} to {endDate}</strong></p>
      <p>Days Requested: <strong>{daysRequested(new Date(startDate), new Date(endDate))}</strong></p>
      <p >Status: <span className={application.status}>{application.status}</span></p>
    </div>
  )
}

export default Application