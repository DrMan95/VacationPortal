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
      <p><strong>Date Submitted: </strong>{submitedDate}</p>
      <p><strong>Dates Requested: </strong>{startDate} to {endDate}</p>
      <p><strong>Days Requested: </strong>{daysRequested(new Date(startDate), new Date(endDate))}</p>
      <p className={application.status}><strong>Status: </strong>{application.status}</p>
    </div>
  )
}

export default Application