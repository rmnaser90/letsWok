import { inject, observer } from 'mobx-react'
import React from 'react'

const UserType = inject('authenticationStore', 'inputsStore', 'adminStore')(observer(({ authenticationStore, inputsStore, adminStore, type }) => {
    const { newUser, handleInput } = adminStore

    const classGenerator = function () {
        return type === newUser.type ? "userType selectedType" : "userType"
    }
    const selectType = function () {
        handleInput('newUser', 'type', type)
    }
    return (
        <div className={classGenerator()} onClick={selectType}>

            <h2>{type}</h2>

        </div>
    )
}))

export default UserType
