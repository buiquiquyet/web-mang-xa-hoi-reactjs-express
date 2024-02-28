const express = require('express')
const router = express.Router()
const { CommentController } = require('../app/controller/CommentController')

router.post('/create',  new CommentController().create)
router.get('/show',  new CommentController().show)
router.delete('/:postId',  new CommentController().deleteByPostId)


module.exports = router