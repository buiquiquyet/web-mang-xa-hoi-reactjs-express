const Feed = require('./../model/Feed')


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
    async getByUserId(req, res, next) {
        try {
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
            const dataAllPromises = uniqueUserIds.map(async(item) => {
                const data = await Feed.findOne({ userId: item.userId, createdAt: item.latestTime }).lean();
                return data;
            });
    
            let dataAll = await Promise.all(dataAllPromises);
            dataAll = dataAll.sort((a, b) => b.createdAt - a.createdAt);
    
            return res.json({ success: 'Lấy tin thành công', data: dataAll });
        } catch (error) {
            // Xử lý lỗi
            console.error(error);
            return res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy tin' });
        }
    }
    
    
}

module.exports = new FeedController