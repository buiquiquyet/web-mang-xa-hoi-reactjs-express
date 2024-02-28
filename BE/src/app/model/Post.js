const mongoose = require('mongoose')

const slug = require('mongoose-slug-updater')
const mongooseDelete = require('mongoose-delete')

const Schema = mongoose.Schema
const Post = new Schema(
    {
        userId: mongoose.Schema.Types.ObjectId,
        typePost: {type: String},
        content: {type: String},
    }, 
    {
        timestamps: true
    }
)
mongoose.plugin(slug)
Post.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true
})

module.exports = mongoose.model('Post', Post)