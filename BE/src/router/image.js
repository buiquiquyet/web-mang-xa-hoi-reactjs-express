const express = require('express')
const router = express.Router()
const ImageControler = require('../app/controller/ImageControler')
const uploadImage = require('./../app/middleware/upload')

router.post('/multiple', uploadImage.array('images'), ImageControler.multiple)
router.post('/single', uploadImage.single('images'), ImageControler.single)

module.exports = router