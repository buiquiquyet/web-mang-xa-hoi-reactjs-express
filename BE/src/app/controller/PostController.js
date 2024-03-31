

const Image = require('../model/Images')
const User = require('../model/User')
const Post = require('../model/Post')
const path = require('path')
const fs = require('fs');
class PostController {

    //[POST] /showByUser
    async showByUser (req, res, next) {
       try {
            const userId = req.params.userId
            const user = await User.findOne({ _id: userId}).lean()
            const posts = await Post.find({ userId: userId }).sort({ createdAt: -1 }).lean();
            const images = await Promise.all(posts.map(async (post) => {
                const image = await Image.find({ postId: post._id }).lean();
                return   image ;
            }));
            const result = {
                user,
                posts,
                images
            }
            return res.json({ success: 'Tìm bài viết thành công theo cá nhân' , result});
       } catch (error) {
            return  res.json({ error: 'Đã xảy ra lỗi' });
       }
    }
    //[POST] /showAll
    async showAllPost(req, res, next) {
        try {
            // const page = req.params.count || 1; 
            // const limit = 2; 
            const users = await User.find()
                        // .skip((page - 1) * limit)
                        // .limit(limit)
                        .lean();
    
            const result = [];
    
            for (const user of users) {
                const posts = await Post.find({ userId: user._id }).sort({ createdAt: -1 }).lean();
                const images = await Image.find({ postId: { $in: posts.map(post => post._id) } }).lean();
                result.push({ user, posts, images });
            }
            return res.json({ success: 'Tìm bài viết thành công theo cá nhân', result });
        } catch (error) {
            console.error(error);
            return res.json({ error: 'Đã xảy ra lỗi khi tìm bài viết' });
        }
    }
    
    //[POST] /showByUserAvartarCover
    async showByUserAvartarCover (req, res, next) {
        try {
             const userId = req.body.userId
             const typePost = req.body.typePost
             const post = await Post.findOne(
                { userId: userId, 
                    typePost:  typePost 
                })
                .lean();
            const  image = await Image.find({ postId: post._id }).lean();
            const result = {
                post,
                image,
            }
            if(image) {
                return res.json({ success: 'Tìm bài viết thành công theo cá nhân avartar-cover' ,
                result
            });
            }
            return  res.json({ error: 'Không tìm thấy bài viết bị lỗi' });
        } catch (error) {
             return  res.json({ error: 'Đã xảy ra lỗi' });
        }
     }
    //[GET] /showByUserAvatarImg
    async showByUserAvartarImg (req, res, next) {
        try {
             const user = req.user
             const post = await Post.findOne(
                { userId: user._id, 
                    typePost:  'avartar' 
                })
                .lean();
            const  image = await Image.find({ postId: post._id }).lean();
            if(image) {
                return res.json({ success: 'Tìm ảnh avatar thành công' ,
                image
            });
            }
            return  res.json({ error: 'Không tìm thấy avatar' });
        } catch (error) {
             return  res.json({ error: 'Đã xảy ra lỗi' });
        }
     }
    //[POST] /text  text
    post(req, res, next) {
        
        try {
            const newPost = new Post(
                {
                    userId: req.user._id, 
                    content: req.body.content,
                    typePost: req.body.typePost
                })
            newPost.save()
                .then(() => res.json({ success: 'Đăng bài viết thành công' }))
                .catch(() => res.json({ error: 'Đăng bài viết không thành công' }))
        } catch (error) {
            return res.status(500).json({ error: 'Đã xảy ra lỗi' });
        }
    }
    //[POST] /single file single

    async postWithSingleImage(req, res, next) {
        try {
            if(req.body.typePost === 'cover' || req.body.typePost === 'avartar') {
                await Post.updateOne({
                    userId: req.user._id, 
                    typePost: req.body.typePost
                },
                { $set: { typePost: 'normal' } })
            }
            const newPost = await Post.create(
                {
                    userId: req.user._id, 
                    content: req.body.content,
                    typePost: req.body.typePost
                })
            const newImage = await Image.create(
                {
                    postId: newPost._id, 
                    url: req.file.filename
                })
            if(newPost && newImage) {
                return res.json({ success: 'Đăng bài viết thành công' });
            }else {
                return res.json({ error: 'Đăng bài viết không thành công' })
            }
        } catch (error) {
            return res.status(500).json({ error: 'Đã xảy ra lỗi' });
        }
    }

    //[POST] /multiple file multiple

    async postWithMultipleImage(req, res, next) {
        try {
            const newPost = await Post.create(
                {
                    userId: req.user._id, 
                    content: req.body.content,
                    typePost: req.body.typePost
                })
            const images = req.files.map(file => ({
                postId: newPost._id,
                url: file.filename
                
            }));
                
            const insertedImages = [];
            for (const image of images) {
                const newImage = new Image(image);
                await newImage.save();
                insertedImages.push(newImage);
            }
            if(insertedImages.length === images.length) {
                return res.json({ success: 'Đăng bài viết thành công' });
            } else {
                return res.json({ error: 'Đăng bài viết không thành công' })
            }  
        } catch (error) {
            return res.status(500).json({ error: 'Đã xảy ra lỗi' });
        }
    }
    //[DELETE] /post
    async delete(req, res, next) {
        
        try {
            const uploadDirectory = path.join(__dirname, '../..', 'uploads');
            const postId = req.body.postId;
            const imageUrls = JSON.parse(req.body.imageUrls);
            await Post.deleteOne({ _id: postId }); 
        
            if (imageUrls.length > 0) {
                for (const imageUrl of imageUrls) {
                    const imagePath = path.join(uploadDirectory, imageUrl);
                    
                    if (fs.existsSync(imagePath)) {
                        fs.unlinkSync(imagePath)
                        await Image.deleteOne({ url: imageUrl });
                       
                    }
                }
            }
            return res.json({ success: 'Xóa bài viết thành công' });
        } catch (error) {
            res.status(500).json({ error: 'Đã xảy ra lỗi' });
        }
        
    }
}

module.exports = new PostController