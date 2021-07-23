import React from 'react'
import { inject, observer } from 'mobx-react'
import Navigator from './Admin/Navigator'
import NavBar from './Admin/NavBar'

const Admin =inject('authenticationStore', 'inputsStore','adminStore')(observer(({ authenticationStore, inputsStore,adminStore }) => {
    return (
        <div className="adminPage">
            <NavBar/>
            <Navigator/>
        </div>
    )
}))

export default Admin
