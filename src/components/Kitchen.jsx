import React, { useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import Order from './kitchen/Order'
import DriverMenu from './kitchen/DriverMenu'

const Kitchen = inject('authenticationStore', 'inputsStore', 'kitchenStore')(observer(({ authenticationStore, inputsStore, kitchenStore }) => {
    const { getKitchenOrders,getDrivers, openOrders, readyOrders, showDriversMenu,setShowDriversMenu, socket} = kitchenStore
    const { user } = authenticationStore
   
    
    useEffect(() => {
        getKitchenOrders(user._id)
        getDrivers(user._id)
        socket.on('newOrder', function () {
        getKitchenOrders(user._id)
        })

    }, [])
    return (
        <div className="kitchen">
            {showDriversMenu?<DriverMenu/>:null}
            {openOrders.map((o, i) => <Order order={o} index={i} key={i} />)}
        </div>
    )
}))

export default Kitchen
