import { inject, observer } from 'mobx-react'
import React from 'react'
import UserType from '../subComponents/UserType'

const NewUser = inject('authenticationStore', 'inputsStore', 'adminStore')(observer(({ authenticationStore, inputsStore, adminStore }) => {
    const { newUser, handleInput, userTypes } = adminStore
    return (
        <div className="newUserPage">
            <div className="userTypesContainer">
                {userTypes.map(t => <UserType type={t} />)}
            </div>
            {newUser.type?<div className="newUserInputs">
                <input type="text" placeholder="name"/>
                <input type="text" placeholder="name"/>
                <input type="text" placeholder="name"/>
                <input type="text" placeholder="name"/>
                <input type="text" placeholder="name"/>
                <button>submit</button>
            </div>: null}


        </div>
    )
}))

export default NewUser
