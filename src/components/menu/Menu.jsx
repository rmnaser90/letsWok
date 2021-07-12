import React, { useState } from 'react'
import { inject, observer } from 'mobx-react'
import Category from './Category'
import Option from './Option'

const Menu = inject('inputsStore', 'waiterStore', 'authenticationStore')(observer(({ inputsStore, waiterStore, authenticationStore, client, setShowMenu, refNewOrder }) => {
    const { meals, handleInput, showOptions, setShowOptions, options, addMeal, deselectAllOptions } = inputsStore
    const [openCategory, setOpenCategory] = useState("none")
    const closeMenu = function () {
        setShowOptions(false)
        setShowMenu(false)
        handleInput('newOrderForm', 'meal', {})
        deselectAllOptions()
    }
    

    const addNewMeal = function () {
        addMeal()
        closeMenu()
    }
    return (
        <div id="menuContainer">
            <h1>Menu</h1><h1 onClick={closeMenu} className="closeBtn">X</h1>
            <div className="categoriesContainer">

                {meals.categories.map((c, i) =>
                    <Category name={c}
                        meals={meals[c]}
                        key={i}
                        openCategory={(openCategory === c)}
                        setOpenCategory={setOpenCategory} />)}
            </div>
            {showOptions ?
                <div className="optionsContainer">
                    <h1 className="closeBtn" onClick={()=>setShowOptions(false)}>X</h1>
                    {options.map((o, i) => <Option index={i} option={o} key={i} />)}
                    <button onClick={addNewMeal}>done</button>
                </div> : null
            }


        </div>
    )
}))

export default Menu
