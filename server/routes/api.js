const express = require('express')
const router = express.Router()
const DbManager = require("../dbManager")
const dbManager = new DbManager()




router.post('/signIn', async function (req, res) {
    const { userName, password } = req.body
    const user = await dbManager.sigIn(userName, password)
    res.send(user)
})

router.post('/signOut', async function (req, res) {
    const { userId } = req.body
    const status = await dbManager.signOut(userId)
    res.send(status)
})

router.post('/signInById', async function (req, res) {
    const { userId } = req.body
    const status = await dbManager.signInById(userId)
    res.send(status)
})

router.post('/getClients', async function (req, res) {
    const { userId } = req.body
    const user = await dbManager.signInById(userId)

    if (user.error) {
        res.send(user)
    } else {
        if (user.type === "waiter" || user.type === "admin") {
            try {
                const status = await dbManager.getClients()
                res.send(status)

            } catch (error) {
                res.send({ error: true, status: error })
            }

        } else {
            res.send({ status: "User not authorized", error: false })
        }
    }
})

router.post('/addClient', async function (req, res) {
    const { userId, client } = req.body
    const user = await dbManager.signInById(userId)
    if (user.error) {
        res.send(user)
    } else {
        const status = await dbManager.addClient(client)
        res.send(status)
    }
})



router.post('/newOrder', async function (req, res) {
    const { clientId, waiterId, order } = req.body
    const user = await dbManager.signInById(waiterId)
    if (user.error) {
        res.send(user)
    } else {
        try {
            const status = await dbManager.newOrder(clientId, waiterId, order)
            res.send(status)

        } catch (error) {
            res.send({ error: true, status: error })
        }
    }
})

router.post('/setOrderReady', async function (req, res) {
    const { orderId, driverId, kitchenId } = req.body
    const user = await dbManager.signInById(kitchenId)

    if (user.error) {
        res.send(user)
    } else {
        if (user.type !== "kitchen") {
            res.send({ status: "User not authorized", error: false })
            return
        }
        try {
            const status = await dbManager.setOrderReady(orderId, driverId)
            res.send(status)

        } catch (error) {
            res.send({ error: true, status: error })
        }
    }
})

router.post('/closeOrder', async function (req, res) {
    const { orderId, driverId, comment } = req.body
    const user = await dbManager.signInById(driverId)

    if (user.error) {
        res.send(user)
    } else {
        if (user.type === "driver") {
            try {
                const status = await dbManager.closeOrder(orderId, driverId, comment)
                res.send(status)

            } catch (error) {
                res.send({ error: true, status: "promise handling error" })
            }

        } else {
            res.send({ status: "User not authorized", error: false })
        }


    }
})
router.post('/getKitchenOrders', async function (req, res) {
    const { kitchenId } = req.body
    const user = await dbManager.signInById(kitchenId)

    if (user.error) {
        res.send(user)
    } else {
        if (user.type === "kitchen") {
            try {
                const status = await dbManager.getKitchenOrders()
                res.send(status)

            } catch (error) {
                res.send({ error: true, status: error })
            }

        } else {
            res.send({ status: "User not authorized", error: false })
        }
    }

})

router.get('/getMeals', async function (req, res) {
    const meals = await dbManager.getMeals()
    res.send(meals)
})





// const kitchen = {
//     type: "kitchenss",
//     userName: "kitchen1222",
//     password: "qweqwe",
//     name: "kitchen1",
//     mobile: "052323232",
//     active:true,
// }
// dbManager.addUser(kitchen).then(function (params) {
//     console.log(params);
// })






// router.get('/person/:name', async function (req, res) {
//     const { name } = req.params
//     const person = await Person.findOne({ firstName: name })
//     res.send(person ? person : { error: "cannot find person with provided name" })

// })
// router.get('/people', async function (req, res) {
//     const people = await Person.find({})
//     res.send(people ? people : { error: "no people to show" })

// })

// router.post('/person', async function (req, res) {
//     const data = req.body
//     const isExist = await Person.findOne({ email: data.email })
//     if (isExist) {
//         res.send({ error: "email already exist" })
//     } else {
//         const person = new Person(data)
//         const dbRes = await person.save()
//         res.send({ status: "received", dbRes })
//     }
// })
// router.delete('/person/:id', async function (req, res) {
//     const { id } = req.params
//     console.log(id);
//     const dbRes = await Person.findByIdAndDelete(id)
//     console.log(dbRes);
//     res.send(dbRes)
// })
module.exports = router
// const order = {
//     order: [{
//         "_id": "60e07247ac76e04bde1f09d2",
//         "options": [{
//             "_id": "60e06f79976f9f4908fbfd8b",
//             "name": "mushroom",
//             "price": 3,
//             "__v": 0
//         }],
//         "category": "burger",
//         "name": " let's wok burger",
//         "description": "special burger",
//         "ordered": 0,
//         "price": 45,
//         "__v": 0
//     },
//     {
//         "_id": "60e07247ac76e04bde1f09d5",
//         "options": [{
//             "_id": "60e06f79976f9f4908fbfd8d",
//             "name": "salami",
//             "price": 5,
//             "__v": 0
//         }],
//         "category": "pizza",
//         "name": "salami pizza",
//         "description": "mushroom olive corn ",
//         "ordered": 0,
//         "price": 65,
//         "__v": 0
//     }

//     ]
// }

// newOrder('60e06c62c0a13c44c39271a2','60e06d3c73e4f94605f0ba4b',order)
// countMeals(order.order)



