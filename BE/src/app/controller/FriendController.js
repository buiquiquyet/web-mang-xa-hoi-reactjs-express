const Comment = require('../model/Comment')


class FriendController {
    //[POST] /create
    async create(req, res, next) {
       try {
            const newComment = await Comment.create({
                userId: req.body.userId,
                postId: req.body.postId,
                content: req.body.content
            })

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

module.exports = { FriendController };