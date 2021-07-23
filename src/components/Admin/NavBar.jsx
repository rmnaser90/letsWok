import { inject, observer } from 'mobx-react'
import React from 'react'

const NavBar = inject('authenticationStore', 'inputsStore','adminStore')(observer(({ authenticationStore, inputsStore, adminStore }) => {
   const {goTo, navigator} = adminStore

   const classGenerator = function name(page) {
       if (page === navigator.currentPage) {
        return"selectedPage"
       }else{
           return "menuItem"
       }
   }
    return (
        <div className="navBar">
            <div className={classGenerator('dashboard')} onClick={()=> goTo('dashboard')}>Home</div>
            <div className={classGenerator('clients')} onClick={()=> goTo('clients')}>Clients</div>
            <div className={classGenerator('drivers')} onClick={()=> goTo('drivers')}>Drivers</div>
            <div className={classGenerator('orders')} onClick={()=> goTo('orders')}>Orders</div>
            <div className={classGenerator('newItem')} onClick={()=> goTo('newItem')}>New Item</div>
            <div className={classGenerator('newUser')} onClick={()=> goTo('newUser')}>New User</div>            
        </div>
    )
}))

export default NavBar
