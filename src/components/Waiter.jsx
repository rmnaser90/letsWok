import React, { useEffect, useRef, useState } from 'react'
import { inject, observer } from 'mobx-react'
import SelectedClient from './subComponents/SelectedClient'

const Waiter = inject('authenticationStore', 'inputsStore', 'waiterStore')(observer(({ authenticationStore, inputsStore, waiterStore }) => {
    const [showNewOrder, setShowNewOrder] = useState(false)
    const { clients, lastUpdated, getClients, addClient } = waiterStore
    const { handleInput, newClientForm } = inputsStore
    const { user } = authenticationStore
    const client = clients.find(c => c.mobile.startsWith(newClientForm.mobile))
    const autoRefInput = useRef(null)
    const closeNewOrder = function (isShown) {
        if (isShown) {

            setShowNewOrder(true)
        } else {
            setShowNewOrder(false)
            autoRefInput.current.focus()
        }

    }
    const onPressEnter = async function (target) {
        if (target.key === "Enter") {

            if (client) {
                setShowNewOrder(true)
            } else {
                await addClient(user._id, newClientForm)
                handleInput('newClientForm','name','')
                handleInput('newClientForm','address','')
                setShowNewOrder(true)
            }
        }
    }

    useEffect(() => {
        getClients(user._id)
        autoRefInput.current.focus()
    }, [])

    return (
        <div className="userContainer waiterContainer" onKeyDown={onPressEnter}>
            <SelectedClient setShowNewOrder={closeNewOrder} showNewOrder={showNewOrder} />
            <input className="findClientInput" placeholder="Enter Mobile No." ref={autoRefInput} value={newClientForm.mobile} onChange={(({ target }) => handleInput("newClientForm", "mobile", target.value))} />
           <div className="tablesContainer"></div>
            <p className="lastUpdated">last Updated: {lastUpdated}</p>
        </div>
    )
}))

export default Waiter
