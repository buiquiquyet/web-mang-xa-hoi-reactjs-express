const Introduce = require('../model/Introduce')


class IntroduceController {
    //[POST] /create
    async Create(req, res, next) {
        try {
            
            const key = Object.keys(req.body)[1]
            const value = req.body[key]
            const userId = req.body.userId
            const rs = await Introduce.findOne({
                userId: userId
            })
            if(rs) {
                await Introduce.updateOne(
                    {    userId: userId, },
                    {    [key]: value})
            }else {
                await Introduce.create({  userId: userId})
                await Introduce.updateOne( 
                    {    userId: userId,},
                    {    [key]: value }
                )
            }
            return res.json({success: 'Cập nhật thông tin thành công'})
        } catch (error) {
            return res.json({error: 'Cập nhật thông tin thành công'})
        }
    }
    //[GET] /getbyuserId
    async getByUserId(req, res, next) {
        try {
            const userId = req.params.userId
            const data = await Introduce.findOne({userId: userId})
            return res.json({success: 'lấy thông tin thành công', data})
        } catch (error) {
            return res.json({error: 'lấy thông tin thành công'})
            
        }
    }
    //[POST] /delEachColumn
    async delEachColumn(req, res, next) {
        try {
            const userId = req.body.userId
            const column = req.body.column
            const data = await Introduce.updateOne(
                {userId: userId},
                {
                    [column]: ""
                }
            )
            return res.json({success: 'Xóa thông tin thành công', data})
        } catch (error) {
            return res.json({error: 'Xóa thông tin thành công'})
            
        }
    }
}

module.exports = new IntroduceController ;