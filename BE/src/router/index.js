const userRouter = require('./user')
// const imageRouter = require('./image')
const postRouter = require('./post')
const commentRouter = require('./comment')
const commentFeedbackRouter = require('./commentFeedback')
const evaluateRouter = require('./evaluate')
const multer = require('multer')
const upload = multer()



function router(app) {
   // app.use('/image',  imageRouter)
   app.use('/evaluate', upload.none() , evaluateRouter)
   app.use('/comment', upload.none() , commentRouter)
   app.use('/commentFeedback', upload.none() , commentFeedbackRouter)
   app.use('/post',  postRouter)
   app.use('/', upload.none(), userRouter)
    
}

module.exports = router