import React from 'react'
import { inject, observer } from 'mobx-react'
const Meal = inject('inputsStore', 'waiterStore', 'authenticationStore')(observer(({ inputsStore, waiterStore, authenticationStore, meal }) => {
    const { handleInput, setShowOptions } = inputsStore

    const selectMeal = function () {
        handleInput('newOrderForm', 'meal', meal)
        setShowOptions(true)
    }
    return (
        <div onClick={selectMeal}>
            <h4>{meal.name} - {meal.price}</h4>
        </div>
    )
}))

export default Meal
