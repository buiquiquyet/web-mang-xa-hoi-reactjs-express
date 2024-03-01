const CommentFeedback = require('./../model/CommentFeedback')
const eventEmitterCommentFeedback = require('./../socket/eventEmitter')


class CommentFeedbackController {
    //[POST] /create
    async create(req, res, next) {
       try {
            const commentId = req.body.postId
            const newCommentFeedback = await CommentFeedback.create({
                userId: req.body.userId,
                postId: req.body.postId,
                content: req.body.content
            })
            // Kích hoạt sự kiện 'newCommentFeedback' và truyền commentFCommentFeedback mới đã được tạo
            eventEmitterCommentFeedback.emit('newCommentFeedback', {data: [newCommentFeedback], commentId});

            return res.json({ success: 'comment thành công' })
           
       } catch (error) {
            return res.json({ error: 'comment không thành công' })
        
       }
   }
     //[DELETE] /:postId
     async deleteByPostId(req,res, next) {
        const commentIds = JSON.parse(req.body.commentIds)
        await Promise.all([
            CommentFeedback.find({postId: {$in: commentIds}}).lean().select('_id'),
            CommentFeedback.deleteMany({postId: {$in: commentIds}})
        ])
        .then(([data]) =>  res.json({ success: 'xóa comment thành công' , data}))
        .catch(() =>  res.json({ error: 'xóa comment không thành công' }))
    }
    //[DELETE] /:feedbackId
    async deleteByCommentFeedbackId(req,res, next) {
        const commentFeedId = req.params.commentFeedId
        await CommentFeedback.deleteOne({ _id: commentFeedId })
        
        .then(() =>  res.json({ success: 'xóa comment thành công' }))
        .catch(() =>  res.json({ error: 'xóa comment không thành công' }))
    }
     //[DELETE] /:commentId
     async deleteByCommentId(req, res, next) {
        try {
            const commentId = req.body.commentId;
            const commentFeedId = await CommentFeedback.find({postId: commentId}).select('_id')
            await CommentFeedback.deleteMany({ postId: commentId });
            res.json({ success: 'Xóa comment thành công', data: commentFeedId});
        } catch (error) {
            res.status(500).json({ error: 'Xóa comment không thành công', message: error.message });
        }
    }
    
     //[GET] /show
    async  show(req, res, next) {
        const commentId = req.query.postId
        const limit = req.query.limit
        const countDocs = 5
        const count = limit * countDocs
        
        await Promise.all([
            CommentFeedback.find({postId: commentId})
            .sort({ createdAt: -1 }) ,
            // .limit(count),
            CommentFeedback.countDocuments({postId: commentId})
        ])
        .then(([data, total]) => {
            if (data.length === 0) {
                return res.json({ error: 'Không tìm thấy commentFCommentFeedback' });
            }
            return res.json({ success: 'lấy commentFCommentFeedback thành công' , data, total, commentId });
        })
        .catch(() =>  res.json({ error: 'lấy commentFCommentFeedback không thành công' }))
   }
}

module.exports = { CommentFeedbackController, eventEmitterCommentFeedback };