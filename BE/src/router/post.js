const express = require('express')
const router = express.Router()
const PostController = require('../app/controller/PostController')
const uploadImage = require('./../app/middleware/upload')
const middlewareVerify = require('../app/middleware/UserMiddleware')
const multer = require('multer')
const upload = multer()

router.post('/text',  middlewareVerify, PostController.post)
router.post('/delete',upload.none(),   PostController.delete)
router.post('/showByUser',  middlewareVerify, PostController.showByUser)
router.post('/showByUserAvartarCover',upload.none(),  middlewareVerify, PostController.showByUserAvartarCover)
router.post('/multiple', uploadImage.array('images'),middlewareVerify, PostController.postWithMultipleImage)
router.post('/single', uploadImage.single('images'),middlewareVerify, PostController.postWithSingleImage)

module.exports = router