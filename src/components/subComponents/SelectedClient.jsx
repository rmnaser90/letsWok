import React, { useState } from 'react'
import { inject, observer } from 'mobx-react'
import NewOrder from '../NewOrder'
const SelectedClient = inject('inputsStore', 'waiterStore', 'authenticationStore')(observer(({ inputsStore, waiterStore, authenticationStore, showNewOrder, setShowNewOrder }) => {
    const { user } = authenticationStore
    const { clients, addClient } = waiterStore
    const { handleInput, newClientForm } = inputsStore
    const client = clients.find(c => c.mobile.startsWith(newClientForm.mobile))
 
    const addClientBtn = async function () {
        await addClient(user._id, newClientForm)
        handleInput('newClientForm','name','')
        handleInput('newClientForm','address','')
    }
    return (
        <div className="selectedClient" >
            <div className="clientInfo" >

                {showNewOrder ? <NewOrder client={client} setShowNewOrder={setShowNewOrder} /> : null}
                <h2 className="selectedClientInfo">Name: {client ? client.name :
                        <input value={newClientForm.name}
                            onChange={(({ target }) =>
                                handleInput("newClientForm", "name", target.value))}
                        />}
                </h2>
                <h2>Mobile: {client ? client.mobile :
                        <input value={newClientForm.mobile}
                            onChange={(({ target }) =>
                                handleInput("newClientForm", "mobile", target.value))} />}
                </h2>
                <h2>Address: {client ? client.address[0] :
                        <input value={newClientForm.address}
                            onChange={(({ target }) =>
                                handleInput("newClientForm", "address", target.value))} />}
                </h2>
                <h2>Previous orders: {client ? client.orderHistory.length : 0}</h2>
                <h2>Open orders: {client ? client.openOrders.length : 0}</h2>
            </div>
            <div className="btnContainer">

                {client ? <button disabled={!client} onClick={() => setShowNewOrder(!showNewOrder)}>New order</button>
                    : <button onClick={addClientBtn}>Add client</button>}

            </div>
        </div>
    )
}))

export default SelectedClient
