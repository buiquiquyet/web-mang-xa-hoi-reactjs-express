const express = require('express')
const router = express.Router()
const  IntroduceController  = require('../app/controller/IntroduceController')

router.post('/create',  IntroduceController.Create)
router.get('/getByUserId/:userId',  IntroduceController.getByUserId)
router.post('/delEachColumn',  IntroduceController.delEachColumn)



module.exports = router