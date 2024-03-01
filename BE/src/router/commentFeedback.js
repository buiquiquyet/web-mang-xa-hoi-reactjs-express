const express = require('express')
const router = express.Router()
const { CommentFeedbackController } = require('../app/controller/CommentFeedbackController')

router.post('/create',  new CommentFeedbackController().create)
router.get('/show',  new CommentFeedbackController().show)
router.post('/deleteByCommentIds',  new CommentFeedbackController().deleteByPostId)
router.delete('/deleteByCommentFeedbackId/:commentFeedId',  new CommentFeedbackController().deleteByCommentFeedbackId)
router.post('/deleteByCommentId',  new CommentFeedbackController().deleteByCommentId)


module.exports = router