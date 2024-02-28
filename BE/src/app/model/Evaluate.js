const mongoose = require('mongoose')

const mongooseDelete = require('mongoose-delete')

const Schema = mongoose.Schema
const Evaluate = new Schema(
    {
        userId: mongoose.Schema.Types.ObjectId,
        postCommentId: mongoose.Schema.Types.ObjectId,
        typeEvaluate:  {  type: String, },
    }, 
    {
        timestamps: true
    }
)
Evaluate.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true
})

module.exports = mongoose.model('Evaluate', Evaluate)