const multer = require('multer')
const path = require('path')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'src/uploads/');
    },
    filename: function (req, file, cb) {
       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
       let ext = path.extname(file.originalname);
       cb(null,  uniqueSuffix + ext);
    }
 });
const uploadImage = multer({ 
   storage: storage 
   
})

module.exports = uploadImage