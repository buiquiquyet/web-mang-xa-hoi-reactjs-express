const express = require('express')
const router = express.Router()
const  CheckFeedController  = require('../app/controller/CheckFeedController')

router.post('/create',  CheckFeedController.create)

module.exports = router