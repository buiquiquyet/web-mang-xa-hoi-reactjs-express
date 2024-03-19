const Friend = require('../model/Friend')


class FriendController {
    //[POST] /createFriend
    createFriend(req, res, next) {
       try {
            const userId1 = req.body.userId1
            const userId2 = req.body.userId2
            const newFriend = new Friend({
                userId1: userId1,
                userId2: userId2,
                sender_id: userId1,
                receiver_id: userId2,
                status: 'pending'
            })
            newFriend.save()
            .then((rs) => {
                if(rs) {
                    return res.json({ success: 'gửi lời mời thành công',data: rs })
                }
                return res.json({ error: 'gửi lời mời không thành công' })

            })
            .catch(() => res.json({ error: 'gửi lời mời không thành công' }))
            
           
       } catch (error) {
            return res.json({ error: 'đã xảy ra lỗi' })
       }
   }
   //[POST] /getStatus
   async getStatusFriend(req, res, next) {
        try {
            const userId1 = req.body.userId1
            const userId2 = req.body.userId2
            const rs = await Friend.findOne({
                $or: [
                    { userId1: userId1, userId2: userId2 },
                    { userId1: userId2, userId2: userId1 }
                ]
            })
            if(rs) {
                return res.status(200).json({ success: 'lấy trạng thái thành công', data: rs });
            }
            return res.json({ error: 'lấy trạng thái không thành công' })
            
        } catch (error) {
            return res.json({ error: 'đã xảy ra lỗi' })
        
        }
    }
     //[POST] /cancelAddFriend
    async cancelAddFriend(req, res, next) {
        try {
            const userId1 = req.body.userId1
            const userId2 = req.body.userId2
            const rs = await Friend.deleteOne({
                $or: [
                    { userId1: userId1, userId2: userId2 },
                    { userId1: userId2, userId2: userId1 }
                ]
            })
            if(rs) {
                return res.status(200).json({ success: 'Hủy kết bạn thành công'});
            }
            return res.json({ error: 'Hủy kết bạn không thành công' })
            
        } catch (error) {
            return res.json({ error: 'đã xảy ra lỗi' })
        
        }
        
    }
     //[POST] /cancelAddFriend
     async updateAcceptedFriend(req, res, next) {
        try {
            const userId1 = req.body.userId1
            const userId2 = req.body.userId2
            const rs = await Friend.updateOne(
                {
                $or: [
                    { userId1: userId1, userId2: userId2 },
                    { userId1: userId2, userId2: userId1 }
                ] 
                },
                { $set: {status: 'accepted'} }
            )
            if(rs) {
                return res.status(200).json({ success: 'Chấp nhận kết bạn thành công'});
            }
            return res.json({ error: 'Chấp nhận kết bạn không thành công' })
            
        } catch (error) {
            return res.json({ error: 'đã xảy ra lỗi' })
        }
    }
    //[GET] /getNewLessAdd
    async getNewLessAdd(req, res, next) {
       
        try {
            const userRecive = req.params.userRecive
            const rs = await Friend.findOne({receiver_id: userRecive, status: 'pending' }).sort({created_at: -1}).exec()
            if(rs) {
                return res.status(200).json({ success: 'Lấy newLess kết bạn thành công', data: rs});
            }
            return res.json({ error: 'Lấy newLess kết bạn không thành công' })
            
        } catch (error) {
            return res.json({ error: 'đã xảy ra lỗi' })
        }
    }
    //[GET] /getAllFriend
    async getAllFriend(req, res, next) {
        try {
            const userId = req.query.userId
            const typeFriend = req.query.typeFriend
            if(typeFriend === 'pending') {
                const rs = await Friend.find(
                    {
                        receiver_id: userId ,
                        status: typeFriend 
                    }
                ).sort({created_at: -1}).lean()
                if(rs) {
                    return res.status(200).json({ success: 'Lấy allFriend kết bạn thành công', data: rs});
                }
                return res.json({ error: 'Lấy allFriend kết bạn không thành công' })
            }else {
                const rs = await Friend.find(
                    {
                        $or: [
                            { $and: [{ userId1: userId }, { userId2: { $ne: userId } }, {status: typeFriend}] },
                            { $and: [{ userId2: userId }, { userId1: { $ne: userId } }, {status: typeFriend}] }
                        ]
                        }
                ).sort({created_at: -1}).lean()
                if(rs) {
                    return res.status(200).json({ success: 'Lấy allFriend kết bạn thành công', data: rs});
                }
                return res.json({ error: 'Lấy allFriend kết bạn không thành công' })
            }
            
        } catch (error) {
            return res.json({ error: 'đã xảy ra lỗi' })
        }
    }
     //[GET] /getAllIdFriend
     async getAllIdFriend(userId) {
        try {
            const rs = await Friend.find(
                {
                    $or: [
                        { $and: [{ userId1: userId }, { userId2: { $ne: userId } },{ status: 'accepted' }] },
                        { $and: [{ userId2: userId }, { userId1: { $ne: userId } },{ status:  'accepted' }] }
                    ]
                    }
            ).select('userId1 userId2').lean()
            if(rs) {
                const filteredRs = rs.map(item => {
                    const filteredItem = [];
                    Object.keys(item).forEach(key => {
                        if (item[key].toString() !== userId && key !== '_id') {
                            filteredItem.push(item[key].toString());
                        }
                    });
                    return filteredItem;
                });
                return filteredRs.flat();
            }
            return false
            
        } catch (error) {
            return false
        }
    }
    //[GET] /getTotalFriend
    async getTotalFriend(req, res, next) {
        try {
            const userId = req.params.userId
            const rs = await Friend.countDocuments(
                {
                    $or: [
                        { userId1: userId, status: 'accepted' },
                        { userId2: userId, status: 'accepted' }
                    ]
                }
            )
            if(rs) {
                return res.status(200).json({ success: 'Lấy total kết bạn thành công', data: rs});
            }
            return res.json({ error: 'Lấy total kết bạn không thành công' })
            
        } catch (error) {
            return res.json({ error: 'đã xảy ra lỗi' })
        }
    }
    
    
}

module.exports = new FriendController ;