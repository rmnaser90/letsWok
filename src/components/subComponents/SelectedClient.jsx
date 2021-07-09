import React, { useState } from 'react'
import { inject, observer } from 'mobx-react'
import NewOrder from '../NewOrder'
const SelectedClient = inject('inputsStore', 'waiterStore', 'authenticationStore')(observer(({ inputsStore, waiterStore, authenticationStore }) => {
    const [showNewOrder, setShowNewOrder] = useState(false)
    const { user } = authenticationStore
    const { clients, addClient } = waiterStore
    const { handleInput, newClientForm } = inputsStore
    const client = clients.find(c => c.mobile.startsWith(newClientForm.mobile))

    return (
        <div id="selectedClient">
            <h2>Name:
                {client ? client.name :
                    <input value={newClientForm.name}
                        onChange={(({ target }) =>
                            handleInput("newClientForm", "name", target.value))}
                    />}
            </h2>
            <h2>Mobile:
                {client ? client.mobile :
                    <input value={newClientForm.mobile}
                        onChange={(({ target }) =>
                            handleInput("newClientForm", "mobile", target.value))} />}
            </h2>
            <h2>Address:
            {client ? client.address[0] :
                    <input value={newClientForm.address}
                        onChange={(({ target }) =>
                            handleInput("newClientForm", "address", target.value))} />}
            </h2>
            <h2>previous orders: {client ? client.orderHistory.length : 0}</h2>
            {client ? null : <button onClick={() => addClient(user._id, newClientForm)}>Add client</button>}
            <button disabled={!client} onClick={()=>setShowNewOrder(!showNewOrder) }>New order</button>
            {showNewOrder ? <NewOrder client={client} setShowNewOrder={setShowNewOrder} /> : null}
        </div>
    )
}))

export default SelectedClient
