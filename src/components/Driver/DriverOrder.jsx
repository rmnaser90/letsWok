import React, { useState } from 'react'
import { inject, observer } from 'mobx-react'
import Item from '../kitchen/Item'
import Comment from './Comment'
const DriverOrder = inject('inputsStore', 'driverStore', 'authenticationStore')(observer(({ inputsStore, driverStore, authenticationStore, order, index }) => {
    const [showItems, setShowItems] = useState(false)
    const { selectOrderId, selectedOrderId, setShowComment, showComment} = driverStore
    const closeOrderBtn = function () {
        selectOrderId(order._id)
        setShowComment(true)
    }


    return (
        <div className="DriverOrderContainer" tabIndex={index}>
            <div className="clientInfoContainer" onClick={() => setShowItems(!showItems)}>

                <h1 className="orderNo">{order.orderNumber}</h1>
                <h3 className="clientInfoKitchen">{order.client.name}</h3>
                <a className="clientInfoKitchen" href={"tel:" + order.client.mobile}>{order.client.mobile}</a>
                <h3 className="clientInfoKitchen">{order.client.address[0]}</h3>
                <h1 className="orderNo">{order.total}</h1>
            </div>
            {showItems ? <div className="driverItemsContainer" >
                {order.order.map((m, i) => <Item meal={m} key={i} index={i} hideControl={true} />)}
                <div className="deliveredBtn" onClick={closeOrderBtn}>Delivered</div>
            </div> : null}
        </div>
    )
}))

export default DriverOrder
