const mongoose = require('mongoose')
const Schema = mongooose.Schema

const schema = new Schema({
    name: { type: String, require: true, trim: true},
    email: {type: String, require: true, trim: true},
    password: {type: String, require: true, trim: true},
    role: {type: String, default: 'member'}
}, {
    collection: 'users'
});

const user = mongoose.model("User", schema)
module.exports = user