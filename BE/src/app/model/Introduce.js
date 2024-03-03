const mongoose = require('mongoose')

const mongooseDelete = require('mongoose-delete')

const Schema = mongoose.Schema
const Introduce = new Schema(
    {
        userId: mongoose.Schema.Types.ObjectId,
        province: {type: String},
        school: {type: String},
        place: {type:String},
        status: {type:String},
        phoneNumber: {type: Number},
    }, 
    {
        timestamps: true
    }
)
Introduce.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true
})

module.exports = mongoose.model('Introduce', Introduce)