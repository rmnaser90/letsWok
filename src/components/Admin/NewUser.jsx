import { inject, observer } from 'mobx-react'
import React from 'react'
import UserType from '../subComponents/UserType'

const NewUser = inject('authenticationStore', 'inputsStore', 'adminStore')(observer(({ authenticationStore, inputsStore, adminStore }) => {
    const { newUser, handleInput, userTypes, addUser, emptyForm } = adminStore
    const { user } = authenticationStore
    const submitBtn = async () => {
        if (newUser.password === newUser.confirmPassword) {
            for (const i in newUser) {
                if (!newUser[i]) {
                    alert("Please enter a " + i)
                    return
                }
            }
            const res = await addUser(user._id)
            if (!res.error) {
                emptyForm('newUser')
            }
        } else {
            alert("Password doesn't match")
        }
    }
    return (
        <div className="newUserPage">
            <div className="userTypesContainer">
                {userTypes.map((t, i) => <UserType key={i} type={t} />)}
            </div>
            {newUser.type ? <div className="newUserForm">
                <div className="newUserInputs">
                    <h2 className="inputTitle">Name</h2>
                    <input className="newUserInput" value={newUser.name} onChange={({ target }) => handleInput('newUser', 'name', target.value)} type="text" placeholder="name" />
                    <h2 className="inputTitle">Mobile</h2>
                    <input className="newUserInput" value={newUser.mobile} onChange={({ target }) => handleInput('newUser', 'mobile', target.value)} type="text" placeholder="mobile" />
                    <h2 className="inputTitle">User Name</h2>
                    <input className="newUserInput" value={newUser.userName} onChange={({ target }) => handleInput('newUser', 'userName', target.value)} type="text" placeholder="User Name" />
                    <h2 className="inputTitle">Password</h2>
                    <input className="newUserInput" value={newUser.password} onChange={({ target }) => handleInput('newUser', 'password', target.value)} type="password" placeholder="password" />
                    <h2 className="inputTitle">Confirm Password</h2>
                    <input className="newUserInput" value={newUser.confirmPassword} onChange={({ target }) => handleInput('newUser', 'confirmPassword', target.value)} type="password" placeholder="enter password again" />
                </div>

                <div className="addUserBtn" onClick={submitBtn}>submit</div>
            </div> : null}


        </div>
    )
}))

export default NewUser
