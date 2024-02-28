const express = require('express')
const router = express.Router()
const { CommentFeedbackController } = require('../app/controller/CommentFeedbackController')

router.post('/create',  new CommentFeedbackController().create)
router.get('/show',  new CommentFeedbackController().show)
router.post('/deleteByCommentIds',  new CommentFeedbackController().deleteByPostId)


module.exports = router