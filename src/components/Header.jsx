import React from 'react'
import { inject, observer } from 'mobx-react'

const Header =inject('authenticationStore', 'inputsStore')(observer(({ authenticationStore, inputsStore }) => {
    return (
        <div id="header">
            <h2 id="userName">{authenticationStore.user.name}</h2>
              {authenticationStore.user.isLoggedIn ?
        <button onClick={() => authenticationStore.signOut()}>
                    Log out
        </button>:null}
        </div>
    )
}))

export default Header
