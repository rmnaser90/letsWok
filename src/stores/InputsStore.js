import { observable, action, makeAutoObservable, runInAction } from "mobx"
import ApiManager from '../services/ApiManager'
const apiManager = new ApiManager()


class InputsStore {
    constructor() {
        this.signIn = {
            userName: "",
            password: ""
        }
        this.newClientForm = {
            name: "",
            mobile: "",
            address: ""
        }
        this.newOrderForm = { meal: {}, order: [] }

        this.meals = { categories: [] }
        this.options = []
        this.showOptions = false

        makeAutoObservable(this, {
            newOrderForm: observable,
            meals: observable,
            options: observable,
            order: observable,
            signIn: observable,
            newClientForm: observable,
            showOptions: observable,
            deselectAllOptions: observable,
            setShowOptions: action,
            getMeals: action,
            handleInput: action,
            emptyForm: action,
            addMeal: action,
            newOrder: action
        })
        this.getMeals()

    }
    setShowOptions = (value) => this.showOptions = value

    handleInput = (form, property, value) => {
        this[form][property] = value
    }
    emptyForm = (form) => this[form] = {}
    getMeals = async () => {
        const res = await apiManager.getMeals()
        const meals = { categories: [] }
        res.meals.forEach(meal => {
            if (meals[meal.category]) {
                meals[meal.category].push(meal)
            } else {
                meals.categories.push(meal.category)
                meals[meal.category] = []
                meals[meal.category].push(meal)
            }

        });
        res.options.forEach(o => o.selected = false)
        runInAction(() => {
            this.options = res.options
            this.meals = meals
        })
    }
    addMeal = () => {
        this.options.forEach(o => {
            if (o.selected) {
                this.newOrderForm.meal.options.push(o)
                o.selected = false
            }
        })
        this.newOrderForm.order.push(this.newOrderForm.meal)
        this.newOrderForm.meal = {}
    }
    selectOption = (index) => {
        this.options[index].selected = !this.options[index].selected
    }
    deselectAllOptions = () => {
        this.options.forEach(o => o.selected = false)
    }
    getTotal = () => {
        let total = 0
        this.newOrderForm.order.forEach(m => {
            total += m.price
            m.options.forEach(o => total += o.price)
        })
        return total
    }
    newOrder = async (clientId, userId) => {
        const res = await apiManager.newOrder(clientId, userId, this.newOrderForm)
        if (res.error) {
            alert(res.status)
        } else {
            this.newClientForm.mobile = ""
        }
        return res
    }

}
export default InputsStore