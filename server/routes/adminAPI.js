const express = require('express')
const router = express.Router()
const DbManager = require("../dbManager")
const dbManager = new DbManager()

router.post('/getOrders', async function (req,res) {
    res.send({status:"admin received"})
})


module.exports = router