const axios = require('axios')
class ApiManager {
    constructor() {
        this.PATH = "http://localhost:3007/"
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
    newOrder = async (clientId,waiterId,order) => {
        const res = await axios.post(this.PATH + 'user/newOrder', {clientId,waiterId,order})
        return res.data
    }
    getMeals = async () => {
        const res = await axios.get(this.PATH + 'user/getMeals')
        return res.data
    }


}

export default ApiManager
