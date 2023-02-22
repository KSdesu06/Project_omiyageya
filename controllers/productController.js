const Product = require('../models/product')
const { validationResult } = require('express-validator')


exports.index = async (req, res, next) => {
  const product = await Product.find().sort({_id: -1})
  res.status(200).json({
    data: product
  })
}

exports.show = async (req, res, next) => {
  try {
      const {id} = req.params
      const product =await Product.findOne({
          _id: id
      })

      if (!product){
        const error = new Error("Product not found.")
        error.statusCode = 400
        throw error;
      } else {
        res.status(200).json({
          data: product
        })
      } 
  } catch (error){
    next(error)
  }
}

exports.insert =   async (req, res, next) => {
  try {
    const {name, price, quantity, statusOfProduct, category} = req.body
    
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const error = new Error("The received data is not valid.")
      error.statusCode = 422
      error.validation = errors.array()
      throw error;
    }
         
    let product = new Product({
      name: name,
      price: price,
      quantity: quantity,
      statusOfProduct: statusOfProduct,
      category: category
    });
    await product.save()
    
    res.status(200).json({
      message: 'Product added successfully.'
    })
  } catch (error) {
    next(error)
  }
}

exports.destroy = async (req, res, next) => {
  try {
    const {id} = req.params
    const product = await Product.deleteOne({
      _id: id
    })
    
    if ( product.deletedCount === 0 ) {
      const error = new Error('Unable to delete this product / Product not found.')
      error.statusCode = 400
      throw error
    } else {
      res.status(200).json({
        message: 'Product deleted successfully.'
      })
    }
  } catch (error) {
    next(error)
  }
}

exports.update = async (req, res, next) => {
  try{
    const {id} = req.params
    const {name, price, quantity, statusOfProduct, category} = req.body
 
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const error = new Error("The received data is not valid.")
      error.statusCode = 422
      error.validation = errors.array()
      throw error;
    }

    const product = await Product.updateOne({ _id: id}, {
      name: name,
      price: price,
      quantity: quantity,
      statusOfProduct: statusOfProduct,
      category: category
    })
       
    if (product.nModified === 0){
      const error = new Error("Unable to update this product.")
      error.statusCode = 400
      throw error;
    } else {
      res.status(200).json({
        message: 'Product updated successfully.'
      })
    }
  } catch (error) {
    next(error)
  }
}