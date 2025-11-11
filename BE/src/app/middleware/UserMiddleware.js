const jwt = require('jsonwebtoken');
const User = require('../model/User');

const SECRET = process.env.JWT_SECRET;
module.exports =  async function  middlewareVerify(req, res, next) {
        try {
            const authorizationHeader = req.headers.authorization;

            if (!authorizationHeader) {
                return res.json({ error: 'Bạn chưa đăng nhập' });
            }
    
            const token = authorizationHeader.split(' ')[1];
            const idUser = jwt.verify(token, SECRET);
            if (!idUser) {
                return res.json({ error: 'Token không hợp lệ' });
            }
    
            const user = await User.findOne({ _id: idUser._id });
            if (!user) {
                return res.json({ error: 'Người dùng không tồn tại' });
            }
    
            req.user = user;
            next();
        } catch (error) {
            return res.json({ error: 'Đã xảy ra lỗi?' });
        }
    }
    
