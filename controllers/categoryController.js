const { validationResult } = require('express-validator')
const Category = require('../models/category')

//get all category
exports.index = async (req, res, next) => {
  const category = await Category.find().sort({_id: -1}).populate('product')
  res.status(200).json({
      data: category
  })
}

//get category by id
exports.show = async (req, res, next) => { 
  try {
    const {id} = req.params
    const category =await Category.findOne({
        _id: id
     }).populate('product')

     if (!category){
        const error = new Error("Category not found.")
        error.statusCode = 400
        throw error;
     } else {
        res.status(200).json({
        data: category
        })
     }
  } catch (error){
    next(error)
  }
}

//insert category
exports.insert = async (req, res, next) => {
  try {
    const {name, numOfProduct} = req.body

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const error = new Error("The received data is not valid.")
      error.statusCode = 422
      error.validation = errors.array()
      throw error;
    }
    
    let category = new Category({
        name: name,
        numOfProduct: numOfProduct
    });
    await category.save()

    res.status(200).json({
        message: 'Category added successfully'
    })
  } catch (error) {
    next(error)
  }
}

//delete category
exports.destroy = async (req, res, next) => {
  try {
    const {id} = req.params
    const category = await Category.deleteOne({
      _id: id
    })
    
    if ( category.deletedCount === 0 ) {
      const error = new Error('Unable to delete this category / Category not found.')
      error.statusCode = 400
      throw error
    } else {
      res.status(200).json({
        message: 'Category deleted successfully.'
      })
    }
  } catch (error) {
    next(error)
  }
}

//update category
exports.update = async (req, res, next) => {
  try{
    const {id} = req.params
    const {name, numOfProduct} = req.body

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const error = new Error("The received data is not valid.")
      error.statusCode = 422
      error.validation = errors.array()
      throw error;
    }
 
    const category = await Category.updateOne({ _id: id}, {
      name: name,
      numOfProduct: numOfProduct
    })
       
    if (category.nModified === 0){
      const error = new Error("Unable to update this category.")
      error.statusCode = 400
      throw error;
    } else {
      res.status(200).json({
        message: 'Category updated successfully.'
      })
    }
  } catch (error) {
    next(error)
  }
}