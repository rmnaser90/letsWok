import React from 'react'
import { inject, observer } from 'mobx-react'
const OrderedMeal = inject('inputsStore', 'waiterStore', 'authenticationStore')(observer(({ inputsStore, index, waiterStore, authenticationStore, meal, hideControl }) => {
    const { deleteItem, decrementItem, incrementItem } = inputsStore
    const getPrice = function () {
        const quantity = meal.quantity ? meal.quantity : 1
        let price = meal.price * quantity
        meal.options.forEach(o => price += o.price * quantity)
        return price
    }
    return (
        <div className="orderedMeal">
            {hideControl ? null : <div className="quantityControl">
                <div className="minusBtn quantityBtn" onClick={() => decrementItem(index)}> - </div>
                <div className="quantity">{meal.quantity}</div>
                <div className="plusBtn quantityBtn" onClick={() => incrementItem(index)}> +</div>
            </div>}
            <div className="selectedOptions">
                <h3 className="mealName">{meal.name} - {meal.price}</h3>
                {
                    meal.options.map((o, i) => <h6 key={i}>{o.name} - {o.price}</h6>)
                }</div>
            <h3>{getPrice()}</h3>
            {hideControl ? null : <button onClick={() => deleteItem(index)}>Delete</button>}

        </div>
    )
}))

export default OrderedMeal
