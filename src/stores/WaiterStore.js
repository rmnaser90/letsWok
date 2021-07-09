import { observable, action, makeAutoObservable, runInAction } from "mobx"
import ApiManager from '../services/ApiManager'
const apiManager = new ApiManager()


class WaiterStore {
    constructor() {
        this.clients = [{
            _id: "",
            orderHistory: [],
            openOrders: [],
            name: "",
            address: [""],
            mobile: "",
            active: false,
            date: 0,
        }]
        this.lastUpdated = ""
        makeAutoObservable(this, {
            clients: observable,
            lastUpdated: observable,
            getClients: action
        })
    }

    getClients = async (userId) => {
        const res = await apiManager.getClients(userId)
        if (res.error) {
            alert(res.status)
        } else {
            runInAction(() => {
                this.clients = res.clients
                this.lastUpdated = new Date(res.lastUpdated).toLocaleString()
            })
        }
    }
    addClient = async (userId, client) => {
        const res = await apiManager.addClient({ userId, client })
        if (res.error) {
            alert(res.status)
        } else {
               await this.getClients(userId)
        }
    }




}
export default WaiterStore