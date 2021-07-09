import React from 'react'
import { inject, observer } from 'mobx-react'
import SignIn from './SignIn'
import Kitchen from './Kitchen'
import Waiter from './Waiter'
import Admin from './Admin'
import Driver from './Driver'


const Auth = inject('authenticationStore')(observer(({ authenticationStore}) => {
    const { isLoggedIn, userType } = authenticationStore
    
    if (isLoggedIn()) {
        switch (userType()) {
            case "kitchen":
                return <Kitchen />
            case "admin":
                return <Admin />
            case "waiter":
                return <Waiter />
            case "driver":
                return <Driver />


            default:
                return <SignIn />

        }

    } else {
        return <SignIn />
    }


}))

export default Auth
