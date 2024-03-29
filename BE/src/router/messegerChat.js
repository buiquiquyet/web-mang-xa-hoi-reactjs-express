const express = require('express')
const router = express.Router()
const { MessegerChatController } = require('../app/controller/MessegerChatController')

router.post('/create',  new MessegerChatController().create)
router.post('/show',  new MessegerChatController().show)
router.post('/showLastest',  new MessegerChatController().showLastestMesseger)
router.post('/delete',  new MessegerChatController().delete)



module.exports = router