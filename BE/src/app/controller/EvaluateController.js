const Evaluate = require('./../model/Evaluate')
const User = require('./../model/User')


class EvaluateController {
    //[POST] /:userId
    async getByPostUserId(req, res, next) {
        try {
            const like = await Evaluate.findOne({
                userId: req.body.userId,
                postCommentId: req.body.postCommentId,
                typeEvaluate: req.body.typeEvaluate,
            });
        
            if (like) {
                res.json({ success: 'user đã like' });
            } else {
                res.json({ error: 'user không like' });
            }
        } catch (error) {
            res.json({ error: 'đã xảy ra lỗi' });
        }
        
    }
    //[POST] /total
    async getByPostComment(req, res, next) {
        try {
            const total = await Evaluate.countDocuments({
                postCommentId: req.body.postCommentId,
                typeEvaluate: req.body.typeEvaluate,
            });
        
            const userIds = await Evaluate.find({
                postCommentId: req.body.postCommentId
            }).distinct('userId').lean();
        
            const users = await User.find({ _id: { $in: userIds } }).lean();
        
            res.json({ total, users });
        } catch (error) {
            res.json({ error: 'đã xảy ra lỗi' });
        }
        
    }
    //[POST] /like
    like(req, res, next) {
        try {
            const newEvaluate = new Evaluate({
                userId: req.body.userId,
                postCommentId: req.body.postCommentId,
                typeEvaluate: req.body.typeEvaluate
            })
            newEvaluate.save()
                .then(() =>  res.json({ success: 'like thành công' }))
                .catch(() =>  res.json({ error: 'like không thành công' }))
        } catch (error) {
            return res.status(500).json({error: 'đã xảy ra lỗi'})
        }
    }
     //[POST] /dislike
    async dislike(req, res, next) {
        try {
           const dislike = await Evaluate.deleteOne({
            userId: req.body.userId ,
            postCommentId: req.body.postCommentId,
            typeEvaluate: req.body.typeEvaluate

        })
           if (dislike) {
                res.json({ success: 'user đã dislike' });
            } else {
                res.json({ error: 'user không dislike' });
            }
        } catch (error) {
            return res.status(500).json({error: 'đã xảy ra lỗi'})
        }
    }
     //[DELETE] /:postId

    async deleteByPostId(req,res, next) {
        try {
            await Evaluate.deleteMany({postCommentId: req.params.postId})
            return res.json({ success: 'đã xóa like theo post' });
        } catch (error) {
            return res.status(500).json({error: 'đã xảy ra lỗi'})
        }
    }
     //[POST] /byCommentId
     async deleteByCommentId(req,res, next) {
       
        try {
            const commentIds = JSON.parse(req.body.commentIds)
            await Evaluate.deleteMany({postCommentId: {$in: commentIds}})
            return res.json({ success: 'đã xóa like theo comment' });
        } catch (error) {
            return res.status(500).json({error: 'đã xảy ra lỗi'})
        }
    }
}

module.exports = new EvaluateController