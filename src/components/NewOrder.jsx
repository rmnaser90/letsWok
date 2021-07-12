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

        if (!res.error) {
            closeNewOrder()
            await getClients(user._id)
        }

    }
    return (
        <div id="newOrderContainer">
            <h1 className="title">New order</h1>
            <h1 onClick={closeNewOrder} className="closeBtn">X</h1>
            {showMenu ? <Menu setShowMenu={setShowMenu} /> : null}
            <div className="itemsContainer" >
                {newOrderForm.order.map((m, i) => <OrderedMeal meal={m} key={i} index={i} />)}
                <div id="addMealBtn" onClick={() => setShowMenu(!showMenu)}>Add Meal</div>
            </div>
            <h1>Total: {getTotal()}</h1>
            <button onClick={submitNewOrder}>Submit new order</button>
        </div>
    )
}))

export default NewOrder
