import { observable, action, makeAutoObservable, runInAction } from "mobx"
import ApiManager from '../services/ApiManager'
const apiManager = new ApiManager()


class AdminStore {
    constructor() {
        this.navigator = {
            currentPage: 'dashboard',
            history: []
        }
        this.newUser = {
            type: '',
            name: '',
            mobile: '',
            userName: '',
            password: '',
            confirmPassword: ''
        }
        this.userTypes = ['driver', 'kitchen', 'waiter', 'admin']

        makeAutoObservable(this, {
            navigator: observable,
            newUser: observable,
            goTo: action,
            previousPage: action,
            handleInput: action,
            emptyForm: action

        })
    }
    goTo = (page) => {
        this.navigator.history.push(page)
        this.navigator.currentPage = page
    }
    previousPage = () => {
        const history = this.navigator.history
        history.splice(history.length - 1, 1)
        this.navigator.currentPage = history[history.length]
    }
    handleInput = (form, property, value) => {
        this[form][property] = value
    }
    emptyForm = (form) => {
        for (const i in this[form]) {
            this[form][i] = ''
        }
    }
    addUser = async (userId) => {
        const res = await apiManager.addUser(userId, this.newUser)
        alert(res.status)
        return res
    }


}
export default AdminStore