import { observable, runInAction, action, makeAutoObservable } from "mobx"
import ApiManager from '../services/ApiManager'
const apiManager = new ApiManager()


class AuthenticationStore {
    constructor() {
        this.user = { isLoggedIn: false }
        makeAutoObservable(this, {
            user: observable,
            signInById: action,
            singIn: action,
            signOut: action,
        })
        this.signInById()
    }

    signInById = async () => {
        const userId = localStorage.getItem("userId")
        if (userId) {
            const user = await apiManager.signInById(userId)
            runInAction(() => {
                this.user = user
            })
        } else {
            runInAction(() => {
                this.user = { isLoggedIn: false }
            })

        }
    }

    signIn = async (userName, password) => {
        const user = await apiManager.signIn(userName, password)
        if (user.error) {
            alert(user.status)
        } else {
            localStorage.setItem("userId", user._id)
        }

        runInAction(() => {
            this.user = user
        })
    }
    signOut = async () => {
        const userId = localStorage.getItem("userId")
        const res = await apiManager.signOut(userId)
        if (!res.isLoggedIn) {
            localStorage.setItem("userId", "")
        }
        runInAction(() => {
            this.user = res
        })
    }
    

    isLoggedIn = () => this.user.isLoggedIn

    userType = () => this.user.type

}
export default AuthenticationStore

