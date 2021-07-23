import React from 'react'
import { inject, observer } from 'mobx-react'
const SignIn = inject('authenticationStore', 'inputsStore')(observer(({ authenticationStore, inputsStore }) => {
    const { signIn: signInForm, handleInput } = inputsStore
    const { signIn } = authenticationStore

    const signInBtn = function () {
        signIn(signInForm.userName, signInForm.password)
        handleInput("signIn", "userName", "")
        handleInput("signIn", "password", "")
    }
    const onEnterPress = function (target) {
        if (target.key === "Enter") {
            signInBtn()
        }
    }
    return (
        <div onKeyDown={onEnterPress} className="signInPage">
            <div className="signInForm">
                <h1>Sign in page</h1>
                <input type="text" className="signInInput"
                    value={signInForm.userName}
                    placeholder="Username"
                    onChange={({ target }) => handleInput("signIn", "userName", target.value)} />
                <input type="password" className="signInInput"
                    value={signInForm.password}
                    placeholder="Password"
                    onChange={({ target }) => handleInput("signIn", "password", target.value)} />
                <div onClick={signInBtn} className="signInBtn">Sign in</div>
            </div>

        </div>
    )
}))

export default SignIn
