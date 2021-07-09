import React, { useState } from 'react'
import { inject, observer } from 'mobx-react'
import Meal from './Meal'
import { set } from 'mobx'

const Category = inject('inputsStore', 'waiterStore', 'authenticationStore')(observer(({ inputsStore, waiterStore, authenticationStore, name, meals,openCategory, setOpenCategory }) => {
    return (
        <div onClick={() => setOpenCategory(name)}>
            <h3>{name}</h3>
            {openCategory ? <div className="meals">
                {meals.map((m,i) => <Meal meal={m} key={i}/>)}
            </div> : null}
        </div>
    )
}))

export default Category
