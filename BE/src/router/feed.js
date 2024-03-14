const express = require('express')
const router = express.Router()
const  FeedController  = require('../app/controller/FeedController')
const uploadImage = require('./../app/middleware/upload')
const multer = require('multer')
const upload = multer()

router.post('/create',  upload.none(), FeedController.create)
router.get('/getByUserId/:userId',  upload.none(), FeedController.getByUserId)
router.get('/countByUserId/:userId',  upload.none(), FeedController.countByUserId)



module.exports = router