const mongoose = require('mongoose')

const mongooseDelete = require('mongoose-delete')

const Schema = mongoose.Schema
const Friend = new Schema(
    {
        user1: { type: mongoose.Schema.Types.ObjectId },
        user2: { type: mongoose.Schema.Types.ObjectId },
        sender_id: { type: mongoose.Schema.Types.ObjectId },
        receiver_id: { type: mongoose.Schema.Types.ObjectId },
        status: { type: String, enum: ['pending', 'accepted'], default: 'pending' },
    }, 
    {
        timestamps: true
    }
)
Friend.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true
})

module.exports = mongoose.model('Friend', Friend)