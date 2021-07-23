import React from 'react'
import { inject, observer } from 'mobx-react'
import Clients from './Clients'
import Dashboard from './Dashboard'
import Drivers from './Drivers'
import NewItem from './NewItem'
import NewUser from './NewUser'
import Orders from './Orders'

const Navigator = inject('authenticationStore', 'inputsStore','adminStore')(observer(({ authenticationStore, inputsStore, adminStore }) => {
    const { user, signInById} = authenticationStore
    const {navigator} = adminStore
    switch (navigator.currentPage) {
        case "clients":
            return <Clients/>
            
        case "dashboard":
            return <Dashboard/>
            
        case "drivers":
            return <Drivers/>
            
        case "newItem":
            return <NewItem/>
            
        case "newUser":
            return <NewUser/>
        case "orders":
            return <Orders/>
        default:
            return <Dashboard/>
    }
}))

export default Navigator
