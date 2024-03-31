const express = require('express')
const router = express.Router()
const  FeedController  = require('../app/controller/FeedController')
const uploadImage = require('./../app/middleware/upload')
const multer = require('multer')
const upload = multer()

router.post('/create',  upload.none(), FeedController.create)
router.post('/createImage',uploadImage.single('image') , FeedController.createImage)
router.get('/getByStatusFeed/:userId', FeedController.getByStatusFeed)
router.post('/deleteFeedByUserId/',upload.none(), FeedController.deleteFeedByUserId)
router.get('/getByUserId/:userId',  upload.none(), FeedController.getByUserId)
router.get('/countByUserId/:userId',  upload.none(), FeedController.countByUserId)
router.get('/getByEachUserId/:userId',  upload.none(), FeedController.getByEachUserId)



module.exports = router