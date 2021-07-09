import React, { useState } from 'react'
import { inject, observer } from 'mobx-react'
import Menu from './menu/Menu'
import OrderedMeal from './subComponents/OrderedMeal'
const NewOrder = inject('inputsStore', 'waiterStore', 'authenticationStore')(observer(({ inputsStore, waiterStore, authenticationStore, client, setShowNewOrder }) => {
    const [showMenu, setShowMenu] = useState(false)
    const { newOrderForm, getTotal, handleInput, newOrder } = inputsStore
    const { user } = authenticationStore
    const { getClients } = waiterStore
    const closeNewOrder = function () {
        setShowNewOrder(false)
        handleInput('newOrderForm', 'meal', {})
        handleInput('newOrderForm', 'order', [])
    }
    const submitNewOrder = async function () {
        const res = await newOrder(client._id, user._id)

        if(!res.error){
            closeNewOrder()
            await getClients(user._id)
        }

    }
    return (
        <div id="newOrderContainer">
            <h1>New order</h1>
            <h1 onClick={closeNewOrder}>X</h1>
            {newOrderForm.order.map((m, i) => <OrderedMeal meal={m} key={i} index={i} />)}
            {showMenu ? <Menu setShowMenu={setShowMenu} /> : null}
            <div id="addMealBtn" onClick={() => setShowMenu(!showMenu)}><h2>Add Meal</h2></div>
            <h1>Total: {getTotal()}</h1>
            <button onClick={submitNewOrder}>Submit new order</button>
        </div>
    )
}))

export default NewOrder
