const mongoose = require('mongoose')

const mongooseDelete = require('mongoose-delete')

const Schema = mongoose.Schema
const CountChat = new Schema(
    {
        userId: mongoose.Schema.Types.ObjectId,
        senderId: mongoose.Schema.Types.ObjectId,
    }, 
    {
        timestamps: true
    }
)
CountChat.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true
})

module.exports = mongoose.model('CountChat', CountChat)