import React,{useEffect} from 'react'
import { inject, observer } from 'mobx-react'
import Order from './kitchen/Order'
import DriverOrder from './Driver/DriverOrder'
import Comment from './Driver/Comment'

const Driver = inject('authenticationStore', 'inputsStore', 'driverStore')(observer(({ authenticationStore, inputsStore, driverStore }) => {
    const { user, signInById} = authenticationStore
    const { showComment, setShowComment, handleComment,socket} = driverStore
    useEffect(() => {
     socket.on('setOrderReady', function (res) {
         if (res.driverId === user._id) {
            signInById()
         }
     })
    }, [])
    return (
        <div className="userContainer driverContainer">
            {showComment ? <Comment /> : null}
            {user.openOrders.map((o, i) => <DriverOrder order={o} index={i} key={i} />)}
        </div>
    )
}))

export default Driver
