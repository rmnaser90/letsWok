import React from 'react'
import { inject, observer } from 'mobx-react'
import Item from './Item'
const Order = inject('inputsStore', 'authenticationStore','kitchenStore')(observer(({ inputsStore, index, kitchenStore, authenticationStore, order, hideControl }) => {
  const {showDriversMenu,setShowDriversMenu, selectOrder} = kitchenStore
    // const getPrice = function () {
    //     const quantity = meal.quantity ? meal.quantity : 1
    //     let price = meal.price * quantity
    //     meal.options.forEach(o => price += o.price * quantity)
    //     return price
    // }

    const onOrderClick = function () {
        selectOrder(order)
        setShowDriversMenu(true)
    }

    return (
        <div className="orderContainer" tabIndex={index} onClick={onOrderClick}>
            <div className="clientInfoContainer">

                <h1 className="orderNo">{order.orderNumber}</h1>
                <h3 className="clientInfoKitchen">{order.client.name}</h3>
                <h3 className="clientInfoKitchen">Address: {order.client.address[0]}</h3>
            </div>
            <div className="kitchenItemsContainer" >
                {order.order.map((m, i) => <Item meal={m} key={i} index={i} hideControl={true} />)}
            </div>
                <h1 className="orderNo">{order.total}</h1>
        </div>
    )
}))

export default Order
