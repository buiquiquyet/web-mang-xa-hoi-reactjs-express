const express = require('express')
const router = express.Router()
const FriendController  = require('../app/controller/FriendController')

router.post('/getStatusFriend',  FriendController.getStatusFriend)
router.post('/createFriend',  FriendController.createFriend)
router.post('/cancelAddFriend',  FriendController.cancelAddFriend)
router.post('/updateAcceptedFriend',  FriendController.updateAcceptedFriend)
router.get('/getNewLessAdd/:userRecive',  FriendController.getNewLessAdd)
router.get('/getTotalFriend/:userId',  FriendController.getTotalFriend)
router.get('/getAllFriend',  FriendController.getAllFriend)



module.exports = router