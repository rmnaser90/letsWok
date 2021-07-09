import React, { useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import SelectedClient from './subComponents/SelectedClient'

const Waiter = inject('authenticationStore', 'inputsStore', 'waiterStore')(observer(({ authenticationStore, inputsStore, waiterStore }) => {
    const { clients, lastUpdated, getClients } = waiterStore
    const { selectClient, handleInput, newClientForm } = inputsStore
    const { user } = authenticationStore

    useEffect(() => {
        getClients(user._id)
    }, [])

    return (
        <div>
            <h1>waiter page</h1>
            <SelectedClient />
            <input value={newClientForm.mobile} onChange={(({ target }) => handleInput("newClientForm", "mobile", target.value))} />
            <p>last Updated: {lastUpdated}</p>
        </div>
    )
}))

export default Waiter
