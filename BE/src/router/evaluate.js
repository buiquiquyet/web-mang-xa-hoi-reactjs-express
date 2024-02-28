const express = require('express')
const router = express.Router()
const EvaluateControler = require('../app/controller/EvaluateController')

router.post('/total',  EvaluateControler.getByPostComment)
router.post('/like',  EvaluateControler.like)
router.post('/dislike', EvaluateControler.dislike)
router.post('/userLike', EvaluateControler.getByPostUserId)
router.post('/byCommentId', EvaluateControler.deleteByCommentId)
router.delete('/:postId', EvaluateControler.deleteByPostId)

module.exports = router