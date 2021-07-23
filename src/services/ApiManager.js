const axios = require('axios')
const io = require('socket.io-client')
class ApiManager {
    constructor() {
        this.PATH = "http://localhost:3007/"
        this.socket = io.connect('http://localhost:3007')
    }

    signInById = async (userId) => {
        const res = await axios.post(this.PATH + 'user/signInById', { userId })
        return res.data
    }
    signIn = async (userName, password) => {
        const res = await axios.post(this.PATH + 'user/signIn', { userName, password })
        return res.data
    }
    signOut = async (userId) => {
        const res = await axios.post(this.PATH + 'user/signOut', { userId })
        return res.data
    }
    getClients = async (userId) => {
        const res = await axios.post(this.PATH + 'user/getClients', { userId })
        return res.data
    }
    addClient = async (client) => {
        const res = await axios.post(this.PATH + 'user/addClient', client)
        return res.data
    }
    newOrder = async (clientId, waiterId, order) => {
        const res = await axios.post(this.PATH + 'user/newOrder', { clientId, waiterId, order })
        this.socket.emit('newOrder')

        return res.data
    }
    getMeals = async () => {
        const res = await axios.get(this.PATH + 'user/getMeals')
        return res.data
    }
    getOpenOrders = async (kitchenId) => {
        const res = await axios.post(this.PATH + 'user/getKitchenOrders', { kitchenId })
        return res.data
    }
    getDrivers = async (kitchenId) => {
        const res = await axios.post(this.PATH + 'user/getDrivers', { kitchenId })
        return res.data
    }
    setOrderReady = async (orderId, driverId, kitchenId) => {
        const res = await axios.post(this.PATH + 'user/setOrderReady', { orderId, driverId, kitchenId })
        this.socket.emit('setOrderReady', { driverId })
        return res.data
    }
    closeOrder = async (orderId, driverId, comment) => {
        const res = await axios.post(this.PATH + 'user/closeOrder', { orderId, driverId, comment })
        return res.data
    }
    addUser = async (userId, user) => {
        const res = await axios.post(this.PATH + 'user/addUser', { userId, user })
        return res.data
    }


}

export default ApiManager
