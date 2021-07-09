import React from 'react'
import { inject, observer } from 'mobx-react'

const Kitchen = inject('authenticationStore', 'inputsStore')(observer(({ authenticationStore, inputsStore }) => {
    return (
        <div>
    
            <h1>Kitchen Page</h1>
        </div>
    )
}))

export default Kitchen
