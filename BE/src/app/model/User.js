const mongoose = require('mongoose')

const slug = require('mongoose-slug-updater')
const mongooseDelete = require('mongoose-delete')

const Schema = mongoose.Schema
const User = new Schema(
    {
        email: { type: String, required: true},
        password: {type: String, required: true},
        first_name: {type: String},
        last_name: {type: String},
        birthdate: { type: Date },
        gender: { type: String,  required: true },
        role: { type: String},
        story: {type: String},
        isOnline: {type: String},
        socketId: {type: String},
        slug: {type: String, slug: "email", unique: true}
    }, 
    {
        timestamps: true
    }
)
mongoose.plugin(slug)
User.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true
})

module.exports = mongoose.model('User', User)