const userRouter = require('./user')
// const imageRouter = require('./image')
const postRouter = require('./post')
const commentRouter = require('./comment')
const commentFeedbackRouter = require('./commentFeedback')
const messegerChatRouter = require('./messegerChat')
const introduceRouter = require('./introduce')
const countChatRouter = require('./countChat')
const evaluateRouter = require('./evaluate')
const friendRouter = require('./friend')
const multer = require('multer')
const upload = multer()


function router(app) {
   // app.use('/image',  imageRouter)
   app.use('/evaluate', upload.none() , evaluateRouter)
   app.use('/introduce', upload.none() , introduceRouter)
   app.use('/countChat', upload.none() , countChatRouter)
   app.use('/messeger', upload.none() , messegerChatRouter)
   app.use('/friend', upload.none() , friendRouter)
   app.use('/comment', upload.none() , commentRouter)
   app.use('/commentFeedback', upload.none() , commentFeedbackRouter)
   app.use('/post',  postRouter)
   app.use('/', upload.none(), userRouter)
    
}

module.exports = router