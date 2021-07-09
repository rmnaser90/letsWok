import React from 'react'

const OrderedMeal = ({meal}) => {
    return (
        <div className="orderedMeal">
            <h3>{meal.name} - {meal.price}</h3>
    <div className="selectedOptions">{
        meal.options.map((o,i)=><h6 key={i}>{o.name} - {o.price}</h6>)
    }</div>
            
        </div>
    )
}

export default OrderedMeal
