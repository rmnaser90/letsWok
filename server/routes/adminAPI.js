const express = require('express')
const router = express.Router()
const DbManager = require("../dbManager")
const dbManager = new DbManager()

router.use('/', async function (req, res, next) {
    const { userId } = req.body
    const user = await dbManager.getAdminById(userId)
    if (user.isLoggedIn && user.type == 'admin') {
        req.body.admin = user
        next()
    } else {
        res.send({ error: true, status: "User not logged in or not authorized" })
    }
})

router.post('/getOrders', async function (req, res) {

})

router.post('/addUser', async function (req, res) {
    const { user } = req.body
    const resDb = await dbManager.addUser(user)
    res.send(resDb)
})


module.exports = router