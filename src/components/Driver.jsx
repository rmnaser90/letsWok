import React from 'react'
import { inject, observer } from 'mobx-react'

const Driver = inject('authenticationStore', 'inputsStore')(observer(({ authenticationStore, inputsStore }) => {
    return (
        <div>
          
            <h1>driver page</h1>
        </div>
    )
}))

export default Driver
