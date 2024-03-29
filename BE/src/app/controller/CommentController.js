const Comment = require('./../model/Comment')
const eventEmitter = require('./../socket/eventEmitter')


class CommentController {
    //[POST] /create
    async create(req, res, next) {
       try {
            const newComment = await Comment.create({
                userId: req.body.userId,
                postId: req.body.postId,
                content: req.body.content
            })
            // Kích hoạt sự kiện 'newComment' và truyền comment mới đã được tạo
            eventEmitter.emit('newComment', newComment);

            return res.json({ success: 'comment thành công' })
           
       } catch (error) {
            return res.json({ error: 'comment không thành công' })
        
       }
   }
     //[DELETE] /:postId
     async deleteByPostId(req,res, next) {
        await Promise.all([
            Comment.find({postId: req.params.postId}).lean().select('_id'),
            Comment.deleteMany({postId: req.params.postId})
        ])
        .then(([data]) =>  res.json({ success: 'xóa comment thành công' , data}))
        .catch(() =>  res.json({ error: 'xóa comment không thành công' }))
    }
     //[DELETE] /:commentId
     async deleteByCommentId(req,res, next) {
        try {
            await Comment.deleteOne({ _id: req.params.commentId})
            res.json({ success: 'Xóa comment thành công' });
        } catch (error) {
            return res.json({ error: 'đã xảy ra lỗi' })
        }
    }
     //[GET] /show
    async  show(req, res, next) {
        const postId = req.query.postId
        const limit = req.query.limit
        const countDocs = 5
        const count = limit * countDocs
        
        await Promise.all([
            Comment.find({postId: postId})
            .sort({ createdAt: -1 }) 
            .limit(count),
            Comment.countDocuments({postId: postId})
        ])
        .then(([data, total]) =>  res.json({ success: 'lấy comment thành công' , data, total, limit, countDocs}))
        .catch(() =>  res.json({ error: 'lấy comment không thành công' }))
   }
}

module.exports = { CommentController, eventEmitter };