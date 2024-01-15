import { useState } from "react"
import AllUserApplications from '../tabs/AllUserApplications'
import CreateApplication from '../tabs/CreateApplication'

const Employee = () => {
  const [selectedTab, setSelectedTab] = useState('allApplications')

  const handleTabChange = (tab) => {
    setSelectedTab(tab)
  }

  const renderContent = () => {
    if (selectedTab === 'allApplications') {
      return <AllUserApplications />
    } else if (selectedTab === 'createApplication') {
      return <CreateApplication />
    }
    return null;
  }

  return (
    <div>
      <div className="tabs-container">
        <button className="tab-button" onClick={() => handleTabChange('allApplications')}>
          My Applications
        </button>
        <button className="tab-button" onClick={() => handleTabChange('createApplication')}>
          Create New
        </button>
      </div>
      <div className="tab-content">{renderContent()}</div>
    </div>
  )
}
export default Employee