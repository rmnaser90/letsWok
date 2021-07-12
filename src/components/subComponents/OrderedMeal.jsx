import React from 'react'
import { inject, observer } from 'mobx-react'
const OrderedMeal = inject('inputsStore', 'waiterStore', 'authenticationStore')(observer(({ inputsStore, index, waiterStore, authenticationStore, meal }) => {
    const { deleteItem, decrementItem, incrementItem } = inputsStore
    const getPrice= function () {
        let price=meal.price * meal.quantity
        meal.options.forEach(o=>price += o.price * meal.quantity)
        return price
    }
    return (
        <div className="orderedMeal">
            <div className="quantityControl">
                <div className="minusBtn quantityBtn" onClick={() => decrementItem(index)}> - </div>
                <div className="quantity">{meal.quantity}</div>
                <div className="plusBtn quantityBtn" onClick={() => incrementItem(index)}> +</div>
            </div>
            <div className="selectedOptions">
                <h3 className="mealName">{meal.name} - {meal.price}</h3>
                {
                    meal.options.map((o, i) => <h6 key={i}>{o.name} - {o.price}</h6>)
                }</div>
                <h3>{getPrice()}</h3>
            <button onClick={() => deleteItem(index)}>Delete</button>

        </div>
    )
}))

export default OrderedMeal
