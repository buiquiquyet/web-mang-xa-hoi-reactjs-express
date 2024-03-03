const CountChat = require('../model/CountChat')


class CountChatController {
    //[POST] /create
    async create(req, res, next) {
       try {
            const rs = await CountChat.findOne({
                userId: req.body.userId,
                senderId: req.body.senderId,
            })
            if(!rs) {
                await CountChat.create({
                    userId: req.body.userId,
                    senderId: req.body.senderId,
                })
                return res.json({ success: 'countChat thành công' })
            }
            return res.json({ error: 'countChat không thành công' })
       } catch (error) {
            return res.json({ error: 'countChat không thành công' })
        
       }
   }
    
     //[GET] /getById/:userId
     async getById(req,res, next) {
        try {
            const data = await CountChat.distinct('senderId', { userId: req.params.userId })
            // const total = data.length;
            return res.json({ success: 'Lấy countChat thành công', data});
        } catch (error) {
            return res.json({ error: 'đã xảy ra lỗi' })
        }
    }
     //[POST] /delCountChat
     async delCountChat(req,res, next) {
        try {
            const userId = req.body.userId
            const senderId = req.body.senderId
            await CountChat.deleteOne( { userId: userId, senderId: senderId });
            return res.json({ success: 'Xóa countChat thành công'});
        } catch (error) {
            return res.json({ error: 'đã xảy ra lỗi' })
        }
    }
    
}

module.exports = { CountChatController };