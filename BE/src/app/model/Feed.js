const mongoose = require('mongoose')

const mongooseDelete = require('mongoose-delete')

const Schema = mongoose.Schema
const Feed = new Schema(
    {
        userId: mongoose.Schema.Types.ObjectId,
        image: {type: String},
        indexImg: {type: Number},
        type: {type: String},
        content: {type: String},
    }, 
    {
        timestamps: true
    }
)
Feed.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true
})

module.exports = mongoose.model('Feed', Feed)