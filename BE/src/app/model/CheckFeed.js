const mongoose = require('mongoose')

const mongooseDelete = require('mongoose-delete')

const Schema = mongoose.Schema
const CheckFeed = new Schema(
    {
        userId: mongoose.Schema.Types.ObjectId,
        feedId: mongoose.Schema.Types.ObjectId,
    }, 
    {
        timestamps: true
    }
)
CheckFeed.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true
})

module.exports = mongoose.model('CheckFeed', CheckFeed)