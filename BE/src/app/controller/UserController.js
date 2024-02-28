const User = require('../model/User')
const jwt = require('jsonwebtoken')

class UserController {
    //[GET] /login
    index(req, res, next) {
       
        User.findOne({
            email: req.body.email,
            password: req.body.password
        }).lean()
        .then( user => {
            if(user) {
                const token = jwt.sign({ _id: user._id}, 'quyet',{ expiresIn: 900 })
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
        const birthdate = new Date(req.body.birthdate)
        const dataNew = {...data, birthdate}
        const user = new User(dataNew)
        user.save()
            .then(rs => res.json('Tạo tài khoản mới  thành công!'))
            .catch(err => res.status(500).json('Đã xảy ra lỗi'))
    }
    
    //[POST] /profile
    profile(req, res, next) {
        return res.json(req.user)
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
}

module.exports = new UserController