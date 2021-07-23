import React from 'react'
import { inject, observer } from 'mobx-react'
const Item = inject('inputsStore', 'waiterStore', 'authenticationStore')(observer(({ inputsStore, index, waiterStore, authenticationStore, meal }) => {
    const { } = inputsStore
    const quantity = meal.quantity ? meal.quantity : 1
    const getPrice = function () {
        let price = meal.price * quantity
        meal.options.forEach(o => price += o.price * quantity)
        return price
    }
    return (
        <div className="itemContainer">
            <div className="itemInfoContainer">
                <h2 className="itemInfo">{quantity}</h2>
                <h2  className="itemInfo">{meal.name}</h2>
                <h3  className="itemInfo">{getPrice()}</h3>
            </div>

            <div className="itemOptions">
                {
                    meal.options.map((o, i) => <h4 key={i} className="option">{o.name}</h4>)
                }</div>

        </div>
    )
}))

export default Item
