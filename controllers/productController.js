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
        const {name, price, statusOfProduct, category} = req.body
    
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
          const error = new Error("ข้อมูลที่ได้รับมาไม่ถูกต้อง")
          error.statusCode = 422
          error.validation = errors.array()
          throw error;
        }
        
        let product = new Product({
            name: name,
            price: price,
            statusOfProduct: statusOfProduct,
            category: category
        });
        await product.save()
    
        res.status(200).json({
            message: 'เพิ่มข้อมูลเรียบร้อยแล้ว'
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
        console.log(product)
        if ( product.deletedCount === 0 ) {
          const error = new Error('ไม่สามารถลบข้อมูลได้ / ไม่พบข้อมูล')
          error.statusCode = 400
          throw error
        } else {
          res.status(200).json({
            message: 'ลบข้อมูลเรียบร้อยแล้ว'
          })
        }
        
      } catch (error) {
        next(error)
      }
}

exports.update = async (req, res, next) => {
    try{
        const {id} = req.params
        const {name, price, statusOfProduct, category} = req.body
 
        const product = await Product.updateOne({ _id: id}, {
            name: name,
            price: price,
            statusOfProduct: statusOfProduct,
            category: category
        })
       
       if (product.nModified === 0){
         const error = new Error("ไม่สามารถอัปเดตข้อมูลได้")
         error.statusCode = 400
         throw error;
     } else {
        res.status(200).json({
            message: 'อัปเดตข้อมูลเรียบร้อยแล้ว'
        })
       }
   } catch (error) {
        next(error)
   }
}