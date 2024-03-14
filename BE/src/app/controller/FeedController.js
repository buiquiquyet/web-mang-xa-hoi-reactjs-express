const Feed = require('./../model/Feed')
const Friend = require('./../model/Friend')
class FeedController {
    //[POST] /create
    async create(req, res, next) {
        try {
            const data = {...req.body}
            await Feed.create(data)
            return res.json({success:'Tạo tin thành công'})
        } catch (error) {
            return res.json({error:'Tạo tin không thành công'})
            
        }
    }
    // //[GET] /byUserId
    // async getByUserId(req, res, next) {
    //     try {
    //         const data = {...req.body}
    //         // const type = req.body.type
    //         // const indexImg = req.body.indexImg
    //         // const userId = req.body.userId
    //         // const content = req.body.content
    //         // const image = req.body.image ? req.body.image : ''
    //         await Feed.create(data)
    //         return res.json({success:'Tạo tin thành công'})
    //     } catch (error) {
    //         return res.json({error:'Tạo tin không thành công'})
            
    //     }

    // }

    //[GET] /countByUserId
    async countByUserId(req, res, next) {
        try {
            const userId = req.params.userId
            const total = await Feed.countDocuments({ userId:userId })
            return res.json({success:'Lấy tin thành công', total})
        } catch (error) {
            return res.json({error:'Lấy tin không thành công'})
        }
    }
     //[GET] /countByUserId
     async getByEachUserId(req, res, next) {
        try {
            const userId = req.params.userId
            const data = await Feed.find({ userId:userId }).lean()
            return res.json({success:'Lấy tin thành công', data})
        } catch (error) {
            return res.json({error:'Lấy tin không thành công'})
        }
    }
    //[GET] /getByUserId
    async getByUserId(req, res, next) {
        try {
            const userId = req.params.userId
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
                        if (  key !== '_id') {
                            filteredItem.push(item[key].toString());
                        }
                    });
                    return filteredItem;
                });
                // return res.json({ success: 'Lấy tin thành công', data: filteredRs.flat() }); 
                const uniqueUserIds = await Feed.aggregate([
                    {
                        $group: {
                            _id: '$userId',
                            latestTime: { $max: '$createdAt' } 
                        }
                    },
                    {
                        $project: {
                            userId: '$_id',
                            latestTime: 1,
                            _id: 0
                        }
                    },
                ]);
                const dataAllFrend = uniqueUserIds.filter((item) =>  filteredRs.flat().includes(item.userId.toString()));
                const dataAllPromises = dataAllFrend.map(async(item) => {
                    if(filteredRs.flat().includes(item.userId.toString())) {
                        const data = await Feed.findOne({ userId: item.userId, createdAt: item.latestTime }).lean();
                        return data;
                    }
                });
        
                let dataAll = await Promise.all(dataAllPromises);
                dataAll = dataAll.sort((a, b) => b.createdAt - a.createdAt);
        
                return res.json({ success: 'Lấy tin thành công', data: dataAll });
            }
        } catch (error) {
            // Xử lý lỗi
            console.error(error);
            return res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy tin' });
        }
    }
    
    
}

module.exports = new FeedController