const Client = require('./models/Client')
const Admin = require('./models/Admin')
const Driver = require('./models/Driver')
const Meal = require('./models/Meal')
const Option = require('./models/Option')
const Order = require('./models/Order')
const Waiter = require('./models/Waiter')
const Table = require('./models/Table')
const Day = require('./models/Day')
const Kitchen = require('./models/Kitchen')

class DbManager {

    getOrderNo = async function () {
        const date = new Date()
        const newDate = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
        const day = await Day.findOne({ date: newDate })
        if (day) {
            day.orderNo++
            const res = await day.save()
            return res.orderNo
        } else {
            const newDay = new Day({ date: newDate, orderNo: 1 })
            const res = await newDay.save()
            return res.orderNo
        }
    }

    countMeals = async function (order) {
        for (const i in order) {
            const meal = await Meal.findById(order[i]._id)
            meal.ordered += order[i].quantity
            meal.quantity = 1
            await meal.save()
        }
        return "done"
    }

    newOrder = async function (clientId, waiterId, order) {
        const client = await Client.findById(clientId)
        const waiter = await Waiter.findById(waiterId)
        let total = 0
        order.order.forEach(meal => {
            total += meal.price * meal.quantity
            meal.options.forEach(option => {
                total += option.price * meal.quantity
            })
        });
        const orderDb = new Order(order)
        orderDb.ready = false
        orderDb.active = true
        orderDb.openTime = Date.now()
        orderDb.discount = 0
        orderDb.orderNumber = await this.getOrderNo()
        orderDb.waiter = waiter
        orderDb.total = total
        orderDb.client = client
        client.active = true
        client.openOrders.push(orderDb)
        waiter.orderHistory.push(orderDb)
        await client.save()
        await orderDb.save()
        await waiter.save()
        this.countMeals(order.order)
        return { status: "New order submitted", error: false }
    }

    setOrderReady = async function (orderId, driverId) {
        const order = await Order.findById(orderId)
        const driver = await Driver.findById(driverId)
        driver.openOrders.push(order)
        order.driver = driver
        order.ready = true
        order.readyTime = Date.now()
        await order.save()
        await driver.save()
        return { status: "Order sent to " + driver.name, error: true }
    }

    closeOrder = async function (orderId, driverId, comment) {
        const order = await Order.findById(orderId)
        const driver = await Driver.findById(driverId)
        const client = await Client.findById(order.client)
        if (order.ready) {

            order.active = false
            order.deliveryTime = Date.now()
            order.comment = comment

            driver.orderHistory.push(order)
            const orderIndex = driver.openOrders.findIndex(o => o === orderId)
            driver.openOrders.splice(orderIndex, 1)

            client.orderHistory.push(order)
            const orderIndexClient = client.openOrders.findIndex(o => o === orderId)
            client.openOrders.splice(orderIndexClient, 1)

            if (client.openOrders.length === 0) {
                client.active = false
            }

            const deliveryTime = order.deliveryTime - order.readyTime
            driver.fastestTime = driver.fastestTime < deliveryTime || driver.fastestTime === 0 ? driver.fastestTime : deliveryTime
            driver.slowestTime = driver.slowestTime > deliveryTime ? driver.slowestTime : deliveryTime
            const av = driver.averageTime
            const length = driver.orderHistory.length
            driver.averageTime = (av * (length - 1) + deliveryTime) / length

            await driver.save()
            await order.save()
            await client.save()
            return { status: "Order delivered in " + (deliveryTime / 60000) + " minutes", error: false }
        } else {
            return { status: "Order is not ready", error: true }
        }
    }

    getClients = async function () {
        const clients = await Client.find({}).populate("orderHistory openOrders").exec()
        return {
            clients,
            status: "clients received to front",
            lastUpdated: Date.now(),
            error: false
        }
    }

    addClient = async function (client) {
        const clientExist = await Client.findOne({ mobile: client.mobile })
        if (clientExist) {
            const response = clientExist.toObject()
            response.status = "Client already Exist"
            response.error = true
            return response
        } else {
            client.date = Date.now()
            client.active = false
            client.address = [client.address]
            const dbClient = new Client(client)
            const res = await dbClient.save()
            const newClient = res.toObject()
            newClient.status = "New client added"
            newClient.error = false
            return newClient
        }
    }

    addUser = async function (user) {
        const userExists = await this.getUser(user.userName)
        if (userExists) {
            return { status: "Username already exists", error: true }
        } else {
            user.active = true
            let newUser
            let res
            switch (user.type) {
                case "admin":
                    newUser = new Admin(user)
                    res = await newUser.save()
                    return { status: "New Admin Saved", error: false }
                    break;
                case "kitchen":
                    newUser = new Kitchen(user)
                    res = await newUser.save()
                    return { status: "New kitchen Saved", error: false }
                    break;
                case "waiter":
                    newUser = new Waiter(user)
                    res = await newUser.save()
                    return { status: "New waiter Saved", error: false }
                    break;
                case "driver":
                    newUser = new Driver(user)
                    res = await newUser.save()
                    return { status: "New driver Saved", error: false }
                    break;

                default:
                    return { status: "Wrong user type", error: true }
                    break;
            }
        }
    }

    getUser = async function (userName) {
        const waiter = await Waiter.findOne({ userName })
        const driver = await Driver.findOne({ userName })
        const admin = await Admin.findOne({ userName })
        const kitchen = await Kitchen.findOne({ userName })
        const user = waiter || driver || admin || kitchen
        return user
    }

    getUserById = async function (userId) {
        const waiter = await Waiter.findById(userId)
        const driver = await Driver.findById(userId)
        const admin = await Admin.findById(userId)
        const kitchen = await Kitchen.findById(userId)
        const user = waiter || driver || admin || kitchen || {}
        return user
    }

    signInById = async function (userId) {
        const user = await this.getUserById(userId)
        if (user.isLoggedIn) {
            user.lastLogIn = Date.now()
            await user.save()
            const response = user.toObject()
            delete response.password
            response.status = "Logged in successfully"
            response.error = false
            return response
        } else {
            return { status: "User is not logged in", error: true, isLoggedIn: false }
        }
    }

    sigIn = async function (userName, password) {
        const user = await this.getUser(userName)
        if (user) {
            if (user.password === password) {
                user.isLoggedIn = true
                user.lastLogIn = Date.now()
                await user.save()
                const response = user.toObject()
                delete response.password
                response.status = "Logged in successfully"
                response.error = false
                return response
            } else {
                return { status: "Incorrect Password", error: true }
            }

        } else {
            return { status: "User doesn't Exist", error: true }
        }
    }

    signOut = async function (userId) {
        const user = await this.getUserById(userId)
        user.isLoggedIn = false
        const res = await user.save()
        return res.isLoggedIn ? { status: "Something went wrong", error: true } : { status: "logged out successfully", error: false, isLoggedIn: false }
    }

    getKitchenOrders = async function () {
        const openOrders = await Order.find({ active: true, ready: false }).populate("client").exec()
        const readyOrders = await Order.find({ active: true, ready: true }).populate("client").exec()
        return {
            openOrders,
            readyOrders,
            lastUpdated: Date.now(),
            error: false,
            status: "orders received to front-end"
        }
    }
    getMeals = async function () {
        const meals = await Meal.find({})
        const options = await Option.find({})
        return { meals, options }
    }



}

// dbManager.setOrderReady("60e087bb80486e5d432dd43d","60e06dd95a971146b3607891")
// dbManager.closeOrder("60e087bb80486e5d432dd43d", "60e06dd95a971146b3607891", "very good client")
// dbManager.getClients()


module.exports = DbManager