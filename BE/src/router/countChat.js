const express = require('express')
const router = express.Router()
const { CountChatController } = require('../app/controller/CountChatController')

router.post('/create',  new CountChatController().create)
router.get('/getById/:userId',  new CountChatController().getById)
router.post('/delCountChat',  new CountChatController().delCountChat)



module.exports = router