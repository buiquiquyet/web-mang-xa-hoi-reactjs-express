const mongoose = require('mongoose')

const mongooseDelete = require('mongoose-delete')

const Schema = mongoose.Schema
const CommentFeedback = new Schema(
    {
        userId: mongoose.Schema.Types.ObjectId,
        postId: mongoose.Schema.Types.ObjectId,
        // commentId: mongoose.Schema.Types.ObjectId,
        content: {type: String},
    }, 
    {
        timestamps: true
    }
)
CommentFeedback.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true
})

module.exports = mongoose.model('CommentFeedback', CommentFeedback)