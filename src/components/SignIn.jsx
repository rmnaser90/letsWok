import React from 'react'
import { inject, observer } from 'mobx-react'
const SignIn = inject('authenticationStore', 'inputsStore')(observer(({ authenticationStore, inputsStore }) => {
    const { signIn: signInForm, handleInput } = inputsStore
    const { signIn } = authenticationStore

    const signInBtn = function () {
        signIn(signInForm.userName,signInForm.password)
        handleInput("signIn", "userName", "")
        handleInput("signIn", "password", "")
    }
    return (
        <div>
            <h1>sign in page</h1>
            <div id="signInForm">
                <input type="text"
                    value={signInForm.userName}
                    placeholder="Username"
                    onChange={({ target }) => handleInput("signIn", "userName", target.value)} />
                <input type="password"
                    value={signInForm.password}
                    placeholder="Password"
                    onChange={({ target }) => handleInput("signIn", "password", target.value)} />
                <button onClick={signInBtn}>Sign in</button>
            </div>

        </div>
    )
}))

export default SignIn
