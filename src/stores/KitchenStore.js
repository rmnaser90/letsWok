import { observable, action, makeAutoObservable, runInAction } from "mobx"
import ApiManager from '../services/ApiManager'
const apiManager = new ApiManager()


class KitchenStore {
    constructor() {
        this.openOrders = []
        this.readyOrders = []
        this.selectedOrder = {}
        this.showDriversMenu = false
        this.drivers = []
        this.lastUpdated = ""
        this.socket = apiManager.socket
        makeAutoObservable(this, {
            showDriversMenu: observable,
            openOrders: observable,
            lastUpdated: observable,
            readyOrders: observable,
            drivers: observable,
            selectedOrder:observable,
            selectOrder:action,
            getDrivers: action,
            getKitchenOrders: action,
            setShowDriversMenu: action
        })
    }
    getKitchenOrders = async (kitchenId) => {
        const res = await apiManager.getOpenOrders(kitchenId)
        if (res.error) {
            alert(res.status)

        } else {
            runInAction(() => {
                this.openOrders = res.openOrders
                this.readyOrders = res.readyOrders
            })
        }
    }
    getDrivers = async (kitchenId) => {
        const res = await apiManager.getDrivers(kitchenId)
        if (res.error) {
            alert(res.status)

        } else {
            runInAction(() => {
                this.drivers = res
            })
        }
    }
    setShowDriversMenu = value => {
        this.showDriversMenu = value
    }
    selectOrder = order => {
        this.selectedOrder = order
    }
    setOrderReady  = async (driverId, kitchenId) => {
        const res = await apiManager.setOrderReady(this.selectedOrder._id,driverId,kitchenId)
        if (res.error) {
            alert(res.status)

        } else {
            runInAction(() => {
                this.getDrivers(kitchenId)
                this.getKitchenOrders(kitchenId)
                this.setShowDriversMenu(false)
            })
        }
    }



}
export default KitchenStore