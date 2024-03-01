const MessegerChat = require('../model/MessegerChat')
const eventEmitterMesseger = require('../socket/eventEmitter')


class MessegerChatController {
    //[POST] /create
    async create(req, res, next) {
       try {
            const newMessger = await MessegerChat.create({
                senderId: req.body.senderId,
                receiverId: req.body.receiverId,
                content: req.body.content
            })
            // Kích hoạt sự kiện 'newMessger' và truyền messeger mới đã được tạo
            eventEmitterMesseger.emit('newMesseger', newMessger);

            return res.json({ success: 'chat messeger thành công' })
           
       } catch (error) {
            return res.json({ error: 'chat messeger không thành công' })
        
       }
   }
     //[POST] /show
    async  show(req, res, next) { 
        const userId1 = req.body.userId1
        const userId2 = req.body.userId2
        await MessegerChat.find(
            {
                $or: [
                    { $and: [{ senderId: userId1 }, { receiverId: userId2 }] },
                    { $and: [{ senderId: userId2 }, { receiverId: userId1 }] }
                ]
            }
        )
        .then((data) =>  res.json({ success: 'lấy messeger thành công' , data}))
        .catch(() =>  res.json({ error: 'lấy messeger không thành công' }))
   }
    //[POST] /showLastestMesseger
    async  showLastestMesseger(req, res, next) { 
        const userId1 = req.body.userId1
        const userId2 = req.body.userId2
        await MessegerChat.findOne(
            {
                $or: [
                    { $and: [{ senderId: userId1 }, { receiverId: userId2 }] },
                    { $and: [{ senderId: userId2 }, { receiverId: userId1 }] }
                ]
            }
        ).sort({ createdAt: -1 }) .lean()
        .then((data) =>  res.json({ success: 'lấy messeger mới nhất thành công' , data}))
        .catch(() =>  res.json({ error: 'lấy messeger mới nhất không thành công' }))
   }
}

module.exports = { MessegerChatController, eventEmitterMesseger };