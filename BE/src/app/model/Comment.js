const mongoose = require('mongoose')

const mongooseDelete = require('mongoose-delete')

const Schema = mongoose.Schema
const Comment = new Schema(
    {
        userId: mongoose.Schema.Types.ObjectId,
        postId: mongoose.Schema.Types.ObjectId,
        content: {type: String},
    }, 
    {
        timestamps: true
    }
)
Comment.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true
})

module.exports = mongoose.model('Comment', Comment)