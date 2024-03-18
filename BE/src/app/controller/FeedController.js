const Feed = require('./../model/Feed')
const Friend = require('./../model/Friend')
const path = require('path')
const fs = require('fs');
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
    //[POST] /createImage
    async create(req, res, next) {
        try {
            const feedData = {
                userId: req.body.userId,
                content: req.body.content,
                type: req.body.type
            };
    
            // Kiểm tra xem req.file có tồn tại không
            if (req.file) {
                feedData.image = req.file.filename;
            }
            if (req.body.indexImg) {
                feedData.indexImg = req.body.indexImg;
            }
            await Feed.create(feedData)
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
    //[GET] /updateStatus
    async updateStatus(req, res, next) {
        try {
            const feedId = req.params.feedId
            await Feed.updateOne({ _id: feedId }, { $set: { isCheck: true } })
            return res.json({success:'Cập nhật tin thành công'})
        } catch (error) {
            return res.json({error:'Cập nhật tin không thành công'})
        }
    }
     //[GET] /countByUserId
     async getByEachUserId(req, res, next) {
        try {
            const userId = req.params.userId
            const data = await Feed.find({ userId:userId }).sort({createdAt: -1}).lean()
            return res.json({success:'Lấy tin thành công', data})
        } catch (error) {
            return res.json({error:'Lấy tin không thành công'})
        }
    }
     //[GET] /getByStatusFeed
     async getByStatusFeed(req, res, next) {
        try {
            const userId = req.params.userId
            const data = await Feed.find({ userId:userId, isCheck: false }).lean()
            if(data.length > 0) {
                return res.json({success:'Lấy status tin thành công', total: data.length})
            }
            return res.json({error:'Không có status tin '})
        } catch (error) {
            return res.json({error:'Lấy status tin không thành công'})
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
    //[DELETE] /
    async deleteFeedAfter24hours () {
        try {
            const uploadDirectory = path.join(__dirname, '../..', 'uploads');
            const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
            const deletedFeeds = await Feed.find({ createdAt: { $lt: twentyFourHoursAgo } }, 'image');
            
            await Feed.deleteMany({ createdAt: { $lt: twentyFourHoursAgo } });
            
            if (deletedFeeds.length > 0) {
                for (const deletedFeed of deletedFeeds) {
                    const imagePath = path.join(uploadDirectory, deletedFeed);
                    if (fs.existsSync(imagePath)) {
                        fs.unlinkSync(imagePath)
                    }
                }
            }
        } catch (err) {
            console.error({ error: 'Xóa feed không thành công', err });
            throw err; // Ném lỗi để bên gọi xử lý
        }
    };
     //[DELETE] /deleteFeedByUserId
     async deleteFeedByUserId (req, res, next) {
        try {
           
            const uploadDirectory = path.join(__dirname, '../..', 'uploads');
            const feedId = req.body.feedId
            const urlImage = req.body.url
            await Feed.deleteOne({ _id: feedId });
            if(urlImage !== 'undefined') {
                const imagePath = path.join(uploadDirectory, urlImage);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath)
                }
            }
            return res.json({success: 'Xóa feed thành công'})
        } catch (err) {
            return res.json({error: 'Xóa feed không thành công'})

        }
    };
    
    
}

module.exports = new FeedController