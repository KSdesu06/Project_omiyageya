const  mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({

    name: { type: String, required: true, trim: true },
    price: { type: Number },
    statusOfProduct: { type: String, requir: true, trim: true },
    category: { type: Schema.Types.ObjectId, ref: 'category' },

},{ 
    toJSON: { virtuals: true },
    timestamps: true,   //สร้าง createdAt and updatedAt
    collection: "products" 
});

const product = mongoose.model("Product", schema)
module.exports  = product