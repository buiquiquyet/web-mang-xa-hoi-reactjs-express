const User = require('../model/User')
const jwt = require('jsonwebtoken')
const SECRET = process.env.JWT_SECRET;
class UserController {
    //[GET] /login
    index(req, res, next) {
       
        User.findOne({
            email: req.body.email,
            password: req.body.password
        }).lean()
        .then( user => {
            if(user) {
                const token = jwt.sign({ _id: user._id}, SECRET,{ expiresIn: 36000 })
                
                return res.json({
                    success: 'success',
                    token
                })
            }else {
                return res.json({
                    error: 'Tài khoản hoặc mật khẩu không chính xác'
                })
            }
        })
        .catch(err => res.status(500).json('Đã xảy ra lỗi'))
    }
    
    //[POST] /create
    create(req, res, next) {
        const data = {...req.body}
        const birthdateString = req.body.birthdate
        const parts = birthdateString.split('-'); // Tách chuỗi thành ngày, tháng và năm
        const day = parseInt(parts[0]);
        const month = parseInt(parts[1]) - 1; // Giảm đi 1 vì tháng trong JavaScript bắt đầu từ 0
        const year = parseInt(parts[2]);
        const birthdate = new Date(year, month, day);
        if (isNaN(birthdate.getTime())) {
            return res.status(400).json('Ngày sinh không hợp lệ');
        }
        const dataNew = {...data, birthdate}
        const user = new User(dataNew)
        user.save()
            .then(rs => res.json('Tạo tài khoản mới  thành công!'))
            .catch(err => res.status(500).json('Đã xảy ra lỗi'))
    }
    //[POST] /updateStory
    updateStory(req, res, next) {
        const story = req.body.story
        const userId = req.body.userId
        User.updateOne({ _id: userId }, { $set: { story: story }})
        .then(result => {
            if(result) {
                return res.json({
                    success: 'success',
                    story
                })
            }
            return res.json({
                error: 'error'
            })
        })
        .catch(error => {
            res.status(500).json('Đã xảy ra lỗi')
        });
    }
    //[GET] /profile
    profile(req, res, next) {
        return res.json(req.user)
    }
    //[GET] /profileByUserId
    async profileByUserId(req, res, next) {
        try {
            const data = await User.findOne({ _id: req.params.userId })
            res.json({ success: 'lấy user thành công', data });
        } catch (error) {
            res.json({ error: 'lấy user không thành công' });
        }
    }
    // findAll(req, res, next) {
    //     User.find({}).lean()
    //         .then(user => res.json(user))
    //         .catch(next)
    // }
    //[GET] /
    async getName(req, res, next) {
        try {
            const data = await User.findOne({ _id: req.params.userId }).select('first_name last_name');
            res.json({ success: 'lấy user thành công', data });
        } catch (error) {
            res.json({ error: 'lấy user không thành công' });
        }
    }
    //[GET] /
    async getStatusOnline(req, res, next) {
        try {
            const data = await User.findOne({ _id: req.params.userId }).select('isOnline');
            res.json({ success: 'lấy user thành công', data });
        } catch (error) {
            res.json({ error: 'lấy user không thành công' });
        }
    }
     //[GET] /searchUserName
    async  searchUsers(req, res, next) {
        try {
            const searchQuery = req.query.name;
            const users = await User.find({ 
                $or: [
                    { first_name: { $regex: new RegExp(searchQuery, 'i') } },
                    { last_name: { $regex: new RegExp(searchQuery, 'i') } }
                ]
            });
            res.json({ success: 'Tìm kiếm người dùng thành công', data: users });
        } catch (error) {
            console.error('Lỗi khi tìm kiếm người dùng:', error);
            res.status(500).json({ error: 'Đã xảy ra lỗi khi tìm kiếm người dùng' });
        }
    }
    
}

module.exports = {UserController}