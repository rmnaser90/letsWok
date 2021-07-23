import React from 'react'
import { inject, observer } from 'mobx-react'

const AvailableDriver = inject('authenticationStore', 'inputsStore', 'kitchenStore')(observer(({ authenticationStore, inputsStore, kitchenStore, driver }) => {
    const { openOrders } = driver
    const { setOrderReady } = kitchenStore
    const { user } = authenticationStore

    return (
        <div className="driver" onClick={() => setOrderReady(driver._id, user._id)}>
            <div className="driverInfoContainer">
                <h2 className="driverInfo">{openOrders.length}</h2>
                <h2 className="driverInfo">{driver.name}</h2>
            </div>
            <div className="addressesContainer">

                {openOrders.map((o, i) => <div className="address" key={i}>
                    <h3>{o.client.address[0]}</h3>
                </div>)}
            </div>

        </div>
    )
}))

export default AvailableDriver
