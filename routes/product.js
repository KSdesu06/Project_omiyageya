const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController')
const { body } = require('express-validator')

router.get('/', productController.index)
router.get('/:id', productController.show)
router.post('/', [
    body('name').not().isEmpty().withMessage("Product name is required."),
    body('price').isFloat({min:0}).withMessage("Product price must not be negvative number."),
    body('quantity').isInt({min:0}).withMessage("Quantity of product must not be negative or decimal number."),
    body('statusOfProduct').not().isEmpty().withMessage("Product status is required.").isIn(['ready for shipment', 'pre-order', 'out of stock']).withMessage("Product status must be either 'ready for shipment', 'pre-order', 'out of stock'."),
    body('category').not().isEmpty().withMessage("Product category is required.")
], productController.insert) //validation
router.delete('/:id', productController.destroy)
router.put('/:id', [
    body('name').not().isEmpty().withMessage("Product name is required."),
    body('price').isFloat({min:0}).withMessage("Product price must not be negvative number."),
    body('quantity').isInt({min:0}).withMessage("Quantity of product must not be negative or decimal number."),
    body('statusOfProduct').not().isEmpty().withMessage("Product status is required.").isIn(['ready for shipment', 'pre-order', 'out of stock']).withMessage("Product status must be either 'ready for shipment', 'pre-order', 'out of stock'."),
    body('category').not().isEmpty().withMessage("Product category is required.")
], productController.update)

module.exports = router;
