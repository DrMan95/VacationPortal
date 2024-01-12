import React, { useState } from 'react'
import AllUsers from './AllUsers'
import CreateUser from './CreateUser'

const Admin = () => {
  const [selectedTab, setSelectedTab] = useState('allUsers')

  const handleTabChange = (tab) => {
    setSelectedTab(tab)
  }


  const renderContent = () => {
    if (selectedTab === 'allUsers') {
      return <AllUsers />
    } else if (selectedTab === 'createUser') {
      return <CreateUser />
    }

    return null;
  }

  return (
    <div>
      <div className="tabs-container">
        <button className="tab-button" onClick={() => handleTabChange('allUsers')}>
          All Users
        </button>
        <button className="tab-button" onClick={() => handleTabChange('createUser')}>
          Create User
        </button>
      </div>
      <div className="tab-content">{renderContent()}</div>
    </div>
  )


}

export default Admin