import React from 'react'
import { inject, observer } from 'mobx-react'
import logo from './Logo.jpg'
const Header = inject('authenticationStore', 'inputsStore')(observer(({ authenticationStore, inputsStore }) => {
    return (
        <div className="header">
            <img src={logo} alt="logo" className="logo" />
            <h2 className="userType">{authenticationStore.user.type}</h2>
            <div className="userInfo">
                <h2 className="userName">{authenticationStore.user.name}</h2>
                {authenticationStore.user.isLoggedIn ?
                    <button onClick={() => authenticationStore.signOut()}>
                        Log out
        </button> : null}
            </div>
        </div>
    )
}))

export default Header
