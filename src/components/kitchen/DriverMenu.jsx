import React from 'react'
import { inject, observer } from 'mobx-react'
import AvailableDriver from './AvailableDriver'

const DriverMenu = inject('authenticationStore', 'inputsStore', 'kitchenStore')(observer(({ authenticationStore, inputsStore, kitchenStore }) => {
    const { drivers, setShowDriversMenu} = kitchenStore
    
    return (
        <div className="driversContainer">
            <div className="closeBtn white" onClick={()=>setShowDriversMenu(false)}>X</div>
            {drivers.map((d,i)=><AvailableDriver driver={d} index={i} key={i}/>)}

        </div>
    )
}))

export default DriverMenu
