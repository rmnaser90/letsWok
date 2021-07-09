import React from 'react'
import { inject, observer } from 'mobx-react'

const Admin =inject('authenticationStore', 'inputsStore')(observer(({ authenticationStore, inputsStore }) => {
    return (
        <div>
     
            <h1>Admin page</h1>
        </div>
    )
}))

export default Admin
