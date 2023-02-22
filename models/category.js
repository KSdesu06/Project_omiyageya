const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema ({
    name: {type: String, required: true, trim: true},
    numOfProduct: {type: Number, default: 0}
},{
    toJSON: {virtuals: true},
    timestamps: true,
    collection: "categorys"});

    schema.virtual('product', {
        ref: 'Product',
        localField: '_id',
        foreignField: 'category'
    });

const category = mongoose.model("Category", schema)
module.exports = category