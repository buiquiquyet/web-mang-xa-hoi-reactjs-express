const CheckFeed = require('./../model/CheckFeed')

class CheckFeedController {

    //[POST] /create
    async create (req, res, next) {
        try {
            const userId = req.body.userId
            const feedId = req.body.postId
            await CheckFeed.create({
                userId,
                feedId
            })
            return res.json({success: 'thành công'})
            
        } catch (error) {
            return res.json({error: 'đã xảy ra lỗi'})
        }
        
    }
}
module.exports = new CheckFeedController