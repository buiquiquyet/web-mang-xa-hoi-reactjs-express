const mongoose = require('mongoose')

const slug = require('mongoose-slug-updater')
const mongooseDelete = require('mongoose-delete')

const Schema = mongoose.Schema
const Image = new Schema(
    {
        postId: mongoose.Schema.Types.ObjectId,
        url: {type: String},
        slug: {type: String, slug: "url", unique: true}
    }, 
    {
        timestamps: true
    }
)
mongoose.plugin(slug)
Image.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true
})

module.exports = mongoose.model('Image', Image)