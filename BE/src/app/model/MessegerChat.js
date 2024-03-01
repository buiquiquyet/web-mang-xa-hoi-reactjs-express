const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete')
const Schema = mongoose.Schema
const MessegerChat = new Schema(
    {
        senderId: mongoose.Schema.Types.ObjectId,
        receiverId: mongoose.Schema.Types.ObjectId,
        content: {type: String},
    }, 
    {
        timestamps: true
    }
)
MessegerChat.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true
})
module.exports = mongoose.model('MessegerChat', MessegerChat)